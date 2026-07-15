const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const opportunity = c => Math.round((c.strategic*.30 + c.earnings*.25 + c.discrepancy*.25 + c.convexity*.20)*10)/10;
const scoreClass = n => n >= 8 ? 's-high' : n >= 6 ? 's-mid' : 's-low';
const scoreBadge = (n, opp=false) => `<span class="score ${opp?'s-opp':scoreClass(n)}">${n}</span>`;
let liveData = {meta:{status:'static-fallback'}, companies:{}};

const fmt = {
  number(v, digits=1){ return Number.isFinite(Number(v)) ? Number(v).toLocaleString('en-US',{maximumFractionDigits:digits}) : '—'; },
  multiple(v){ return Number.isFinite(Number(v)) ? `${Number(v).toFixed(1)}×` : '—'; },
  pct(v, digits=1){ return Number.isFinite(Number(v)) ? `${Number(v) >= 0 ? '+' : ''}${Number(v).toFixed(digits)}%` : '—'; },
  yield(v){
    if(!Number.isFinite(Number(v))) return '—';
    const n = Number(v); return `${(Math.abs(n) < 1 ? n*100 : n).toFixed(1)}%`;
  },
  compact(v, currency='USD'){
    if(!Number.isFinite(Number(v))) return '—';
    const n=Number(v), abs=Math.abs(n);
    const symbol={USD:'$',EUR:'€',JPY:'¥',KRW:'₩',TWD:'NT$'}[currency] || `${currency} `;
    if(abs>=1e12) return `${symbol}${(n/1e12).toFixed(1)}T`;
    if(abs>=1e9) return `${symbol}${(n/1e9).toFixed(1)}B`;
    if(abs>=1e6) return `${symbol}${(n/1e6).toFixed(1)}M`;
    return `${symbol}${n.toLocaleString('en-US',{maximumFractionDigits:2})}`;
  },
  price(v,currency='USD'){
    if(!Number.isFinite(Number(v))) return '—';
    const symbol={USD:'$',EUR:'€',JPY:'¥',KRW:'₩',TWD:'NT$'}[currency] || `${currency} `;
    return `${symbol}${Number(v).toLocaleString('en-US',{maximumFractionDigits:Number(v)>=1000?0:2})}`;
  },
  date(value){ if(!value) return 'not available'; const d=new Date(value); return Number.isNaN(d.getTime()) ? value : d.toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}); }
};

function getLive(ticker){ return liveData.companies?.[ticker] || {}; }
function getDerived(ticker){ return getLive(ticker).derived || {}; }
function getFramework(ticker){ return valuationUniverse[ticker] || {framework:'quality-growth',...valuationFrameworks['quality-growth']}; }

function expectationAssessment(c){
  const d=getDerived(c.ticker), m=getLive(c.ticker).metrics || {};
  const vals=[];
  if(Number.isFinite(d.forwardPE)) vals.push(d.forwardPE>70?9:d.forwardPE>50?8:d.forwardPE>35?7:d.forwardPE>25?6:d.forwardPE>18?5:4);
  const sales=Number.isFinite(d.forwardEvSales)?d.forwardEvSales:d.forwardMarketCapSales;
  if(Number.isFinite(sales)) vals.push(sales>20?10:sales>14?9:sales>9?8:sales>6?7:sales>4?6:sales>2.5?5:4);
  const hist=Number.isFinite(d.historicalPePercentile)?d.historicalPePercentile:d.historicalEvSalesPercentile;
  if(Number.isFinite(hist)) vals.push(hist>90?9:hist>75?8:hist>55?6:hist>35?5:3);
  const peerPct=peerValuationPercentile(c); if(Number.isFinite(peerPct)) vals.push(peerPct>85?8:peerPct>65?7:peerPct>40?5:4);
  if(Number.isFinite(d.revenueGrowthFY1)) vals.push(d.revenueGrowthFY1>40?3:d.revenueGrowthFY1>25?4:d.revenueGrowthFY1>12?5:d.revenueGrowthFY1>5?6:8);
  const rev90=d.revenueEstimateRevision90d;
  if(Number.isFinite(rev90)) vals.push(rev90>10?2:rev90>5?3:rev90>0?4:rev90>-5?6:8);
  if(c.ticker==='WOLF') {
    const leverage=m.netDebtToEbitda;
    vals.push(Number.isFinite(leverage) && leverage>6 ? 9 : 8);
  }
  if(!vals.length) return {score:null,label:'Awaiting live data',className:'expect-na'};
  const score=Math.max(1,Math.min(10,Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*10)/10));
  const label=score>=8.5?'Extreme':score>=7?'High':score>=5.2?'Balanced':score>=3.8?'Moderate':'Low';
  return {score,label,className:score>=8?'expect-high':score>=6?'expect-mid':'expect-low'};
}


function peerValuationPercentile(c){
  const f=getFramework(c.ticker);
  const salesFrameworks=new Set(['recurring-ip','compute-growth','network-growth','edge-growth','packaging-complexity','power-cycle','turnaround-distress']);
  const ebitdaFrameworks=new Set(['capital-intensive-foundry','packaging-volume']);
  const metric=t=>{
    const d=getDerived(t.ticker), m=getLive(t.ticker).metrics||{};
    if(salesFrameworks.has(f.framework)) return d.forwardEvSales??d.forwardMarketCapSales;
    if(ebitdaFrameworks.has(f.framework)) return m.evToEbitdaTTM;
    return d.forwardPE;
  };
  const peers=companies.filter(x=>getFramework(x.ticker).label===f.label).map(metric).filter(Number.isFinite);
  const value=metric(c);
  if(!Number.isFinite(value)||peers.length<3)return null;
  return Math.round(100*peers.filter(v=>v<=value).length/peers.length);
}

function historicalLabel(ticker){
  const d=getDerived(ticker);
  const p=Number.isFinite(d.historicalPePercentile)?d.historicalPePercentile:d.historicalEvSalesPercentile;
  if(!Number.isFinite(p)) return '—';
  return `${Math.round(p)}th pct`;
}

function populateSummary(){
  const avg=companies.reduce((a,c)=>a+opportunity(c),0)/companies.length;
  const layers=new Set(companies.map(c=>c.layer)).size;
  const topBottle=[...companies].sort((a,b)=>b.bottleneck-a.bottleneck)[0];
  const topOpp=[...companies].sort((a,b)=>opportunity(b)-opportunity(a))[0];
  $('#summaryCards').innerHTML=`
    <div class="summary-stat"><strong>${companies.length}</strong><span>companies with deep research</span></div>
    <div class="summary-stat"><strong>${layers}</strong><span>industry layers</span></div>
    <div class="summary-stat"><strong>${avg.toFixed(1)}</strong><span>avg. research opportunity</span></div>
    <div class="summary-stat"><strong>${topBottle.ticker}</strong><span>top bottleneck · ${topBottle.bottleneck}/10</span></div>
    <div class="summary-stat" style="grid-column:1/-1"><strong>${topOpp.ticker}</strong><span>highest static research opportunity · ${opportunity(topOpp).toFixed(1)}/10</span></div>`;
}

function populateFilters(){
  const layers=[...new Set(companies.map(c=>c.layer))].sort();
  ['layerFilter','researchLayer'].forEach(id=>{$('#'+id).innerHTML='<option value="all">All layers</option>'+layers.map(x=>`<option value="${x}">${x}</option>`).join('');});
  const frameworks=[...new Set(companies.map(c=>getFramework(c.ticker).label))].sort();
  $('#frameworkFilter').innerHTML='<option value="all">All valuation frameworks</option>'+frameworks.map(x=>`<option value="${x}">${x}</option>`).join('');
}

function renderDataStatus(){
  const meta=liveData.meta || {};
  const live=meta.status==='live';
  const partial=meta.status==='partial';
  const quoteAgeHours=meta.quotesUpdatedAt?(Date.now()-new Date(meta.quotesUpdatedAt).getTime())/36e5:null;
  const stale=live&&Number.isFinite(quoteAgeHours)&&quoteAgeHours>3;
  const cls=stale?'status-partial':live?'status-live':partial?'status-partial':'status-static';
  const title=stale?'Live layer connected — quote snapshot is stale':live?'Live market layer connected':partial?'Market layer partially updated':'Static research mode';
  const quoteText=meta.quotesUpdatedAt?`Quotes: ${fmt.date(meta.quotesUpdatedAt)}`:'Quotes: not configured';
  const fundamentalsText=meta.fundamentalsUpdatedAt?`Fundamentals/consensus: ${fmt.date(meta.fundamentalsUpdatedAt)}`:'Fundamentals/consensus: not configured';
  $('#dataStatus').innerHTML=`<div class="status-dot ${cls}"></div><div><strong>${title}</strong><span>${quoteText} · ${fundamentalsText}</span><small>${meta.note || 'All issuer-sourced research remains available.'}</small></div>`;
  $('#headerLiveStatus').textContent=live?`Live layer · ${fmt.date(meta.quotesUpdatedAt)}`:'Issuer research active · live market layer not yet configured';
}

function filteredCompanies(){
  const q=$('#searchInput').value.trim().toLowerCase(), layer=$('#layerFilter').value, ai=$('#aiFilter').value;
  let list=companies.filter(c=>{const blob=`${c.name} ${c.ticker} ${c.layer} ${c.owns} ${c.question} ${c.thesis}`.toLowerCase();return(!q||blob.includes(q))&&(layer==='all'||c.layer===layer)&&(ai==='all'||c.ai>=Number(ai));});
  const sort=$('#sortSelect').value;
  const sorters={opportunity:(a,b)=>opportunity(b)-opportunity(a),bottleneck:(a,b)=>b.bottleneck-a.bottleneck,strategic:(a,b)=>b.strategic-a.strategic,earnings:(a,b)=>b.earnings-a.earnings,discrepancy:(a,b)=>b.discrepancy-a.discrepancy,convexity:(a,b)=>b.convexity-a.convexity,ticker:(a,b)=>a.ticker.localeCompare(b.ticker)};
  return list.sort(sorters[sort]);
}

function renderTable(){
  const list=filteredCompanies(); $('#resultCount').textContent=`${list.length} of ${companies.length} companies`;
  $('#companyRows').innerHTML=list.map(c=>`<tr data-ticker="${c.ticker}"><td class="sticky-col"><div class="company-name">${c.name}</div><span class="ticker">${c.ticker}</span></td><td><span class="layer-tag">${c.layer}</span></td><td>${c.owns}</td><td>${scoreBadge(c.bottleneck)}</td><td>${scoreBadge(c.strategic)}</td><td>${scoreBadge(c.ai)}</td><td>${scoreBadge(c.earnings)}</td><td>${scoreBadge(c.discrepancy)}</td><td>${scoreBadge(c.convexity)}</td><td>${scoreBadge(opportunity(c),true)}</td><td>${c.awareness}</td><td>${c.cycle}</td><td>${c.question}</td></tr>`).join('');
  $$('#companyRows tr').forEach(row=>row.addEventListener('click',()=>openCompany(row.dataset.ticker)));
}

function renderResearch(){
  const q=$('#researchSearch').value.trim().toLowerCase(), layer=$('#researchLayer').value, sort=$('#researchSort').value;
  let rows=companies.filter(c=>researchCompanies[c.ticker]).filter(c=>{const r=researchCompanies[c.ticker];const blob=`${c.name} ${c.ticker} ${c.layer} ${c.thesis} ${r.financialSignal}`.toLowerCase();return(!q||blob.includes(q))&&(layer==='all'||c.layer===layer);});
  rows.sort(sort==='ticker'?(a,b)=>a.ticker.localeCompare(b.ticker):sort==='bottleneck'?(a,b)=>b.bottleneck-a.bottleneck:(a,b)=>opportunity(b)-opportunity(a));
  $('#researchMetaText').textContent=`${researchMeta.deepDiveCount} of ${companies.length} mapped companies have dated primary-source profiles. Live valuation and consensus data are displayed separately when configured.`;
  $('#researchLeaders').innerHTML=rows.map(c=>{const r=researchCompanies[c.ticker], l=getLive(c.ticker), ex=expectationAssessment(c);return `<article class="panel research-card" data-ticker="${c.ticker}">
    <div class="research-card-head"><div><div class="eyebrow">${c.layer}</div><h3>${c.name}</h3><span class="ticker">${c.ticker}</span></div><div class="research-price">${l.quote?.price?fmt.price(l.quote.price,l.currency):'Research'}<small>${l.quote?.price?'live/last quote':'issuer sourced'}</small></div></div>
    <div class="snapshot-grid"><div class="snapshot"><strong>${r.revenue}</strong><span>${r.latestPeriod}</span></div><div class="snapshot"><strong>${r.growth}</strong><span>reported signal</span></div><div class="snapshot"><strong>${opportunity(c).toFixed(1)}/10</strong><span>research opportunity</span></div></div>
    <p class="research-signal">${r.financialSignal}</p>
    <div class="research-footer"><span class="valuation-tag ${ex.className}">${ex.score?`Expectations ${ex.label} · ${ex.score}/10`:'Live valuation pending'}</span><a class="source-link" href="${r.source}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Primary source ↗</a></div>
  </article>`;}).join('');
  $$('#researchLeaders .research-card').forEach(x=>x.addEventListener('click',()=>openCompany(x.dataset.ticker)));
}

function valuationRowsFiltered(){
  const q=$('#valuationSearch').value.trim().toLowerCase(), fw=$('#frameworkFilter').value;
  let rows=companies.filter(c=>{const f=getFramework(c.ticker);return(!q||`${c.name} ${c.ticker} ${c.layer} ${f.label}`.toLowerCase().includes(q))&&(fw==='all'||f.label===fw);});
  const sort=$('#valuationSort').value;
  rows.sort((a,b)=>{
    const da=getDerived(a.ticker), db=getDerived(b.ticker), la=getLive(a.ticker), lb=getLive(b.ticker);
    const value=(c,d,l)=> sort==='expectations'?(expectationAssessment(c).score??-Infinity):sort==='forwardPE'?(d.forwardPE??-Infinity):sort==='forwardEvSales'?(d.forwardEvSales??d.forwardMarketCapSales??-Infinity):sort==='revision90'?(d.revenueEstimateRevision90d??-Infinity):sort==='priceChange'?(l.quote?.changePercent??-Infinity):0;
    return value(b,db,lb)-value(a,da,la);
  }); return rows;
}

function renderValuation(){
  const list=valuationRowsFiltered(); $('#valuationCount').textContent=`${list.length} companies · ${Object.keys(liveData.companies||{}).length} with provider records`;
  $('#valuationExplainer').innerHTML=`<div><strong>Dynamic layer status</strong><span>${liveData.meta?.status==='live'?'Connected':'Awaiting API configuration'}</span></div><div><strong>Revision history</strong><span>Begins accumulating after first deep refresh</span></div><div><strong>Important</strong><span>Missing data stays blank. No inferred consensus values are fabricated.</span></div>`;
  $('#valuationRows').innerHTML=list.map(c=>{const l=getLive(c.ticker), d=getDerived(c.ticker), m=l.metrics||{}, f=getFramework(c.ticker), ex=expectationAssessment(c), currency=l.currency||l.quote?.currency||'USD';return `<tr data-ticker="${c.ticker}">
    <td class="sticky-col"><div class="company-name">${c.name}</div><span class="ticker">${c.ticker}</span></td><td><span class="framework-tag">${f.label}</span></td><td>${fmt.price(l.quote?.price,currency)}</td><td class="${Number(l.quote?.changePercent)>=0?'positive':'negative'}">${fmt.pct(l.quote?.changePercent)}</td><td>${fmt.compact(l.quote?.marketCap,currency)}</td><td>${fmt.multiple(d.forwardPE)}</td><td>${fmt.multiple(d.forwardEvSales??d.forwardMarketCapSales)}</td><td>${fmt.multiple(m.evToEbitdaTTM)}</td><td>${fmt.yield(m.fcfYield)}</td><td>${fmt.pct(d.revenueGrowthFY1)}</td><td>${fmt.pct(d.revenueEstimateRevision90d)}</td><td>${historicalLabel(c.ticker)}</td><td>${Number.isFinite(peerValuationPercentile(c))?`${peerValuationPercentile(c)}th pct`:'—'}</td><td><span class="expectation-chip ${ex.className}">${ex.score?`${ex.label} ${ex.score}`:ex.label}</span></td></tr>`;}).join('');
  $$('#valuationRows tr').forEach(row=>row.addEventListener('click',()=>openCompany(row.dataset.ticker)));
}

function metricCard(label,value,sourceClass='model-derived',note=''){return `<div class="snapshot live-snapshot"><span class="data-origin ${sourceClass}">${sourceClass.replace('-',' ')}</span><strong>${value}</strong><span>${label}</span>${note?`<small>${note}</small>`:''}</div>`;}

function openCompany(ticker){
  const c=companies.find(x=>x.ticker===ticker); if(!c)return;
  const r=researchCompanies[ticker], l=getLive(ticker), d=getDerived(ticker), m=l.metrics||{}, est=l.estimates||{}, f=getFramework(ticker), ex=expectationAssessment(c), currency=l.currency||l.quote?.currency||'USD';
  const liveCards=[
    metricCard('Price',fmt.price(l.quote?.price,currency),'market-data',liveData.meta?.quotesUpdatedAt?`Updated ${fmt.date(liveData.meta.quotesUpdatedAt)}`:'Not configured'),
    metricCard('Forward P/E',fmt.multiple(d.forwardPE),'model-derived','Price ÷ consensus FY1 EPS'),
    metricCard('Forward EV/Sales',fmt.multiple(d.forwardEvSales??d.forwardMarketCapSales),'model-derived',d.forwardEvSales?'EV ÷ consensus FY1 revenue':'Market cap ÷ consensus FY1 revenue'),
    metricCard('FY1 revenue growth',fmt.pct(d.revenueGrowthFY1),'model-derived','Consensus FY1 vs. TTM'),
    metricCard('90d revenue revision',fmt.pct(d.revenueEstimateRevision90d),'model-derived','Requires stored consensus history'),
    metricCard('Historical valuation',historicalLabel(ticker),'model-derived','Provider quarterly-multiple history')
  ].join('');
  const monitor=(r?.monitor||[]).map(x=>`<li>${x}</li>`).join('');
  $('#dialogContent').innerHTML=`<div class="dialog-body">
    <div class="eyebrow">${c.layer} · FULL RESEARCH</div><h2>${c.name}</h2><div class="dialog-sub"><span class="ticker">${c.ticker}</span> · ${c.cycle} · Awareness: ${c.awareness}</div>
    <div class="dialog-scores"><div class="dialog-score"><strong>${c.bottleneck}</strong><span>Bottleneck</span></div><div class="dialog-score"><strong>${c.strategic}</strong><span>Strategic</span></div><div class="dialog-score"><strong>${c.ai}</strong><span>AI</span></div><div class="dialog-score"><strong>${c.earnings}</strong><span>Earnings</span></div><div class="dialog-score"><strong>${c.discrepancy}</strong><span>Discrepancy</span></div><div class="dialog-score"><strong>${opportunity(c).toFixed(1)}</strong><span>Research opportunity</span></div></div>
    <div class="deep-section"><div class="section-title-row"><h3>Latest issuer-reported signal</h3><span class="data-origin issuer-reported">issuer reported</span></div><div class="dialog-financials">${metricCard(`${r.latestPeriod} revenue`,r.revenue,'issuer-reported')}${metricCard('Reported growth signal',r.growth,'issuer-reported')}${metricCard('Profitability / mix',r.margin,'issuer-reported')}${metricCard('Next known catalyst',r.nextCatalyst,'issuer-reported')}</div><p>${r.financialSignal}</p></div>
    <div class="deep-section"><div class="section-title-row"><h3>Valuation & expectations</h3><span class="expectation-chip ${ex.className}">${ex.score?`Expectations burden: ${ex.label} · ${ex.score}/10`:'Live data pending'}</span></div><p><strong>${f.label}:</strong> ${f.description}</p><p><strong>Primary framework:</strong> ${f.primary}. <strong>Core expectations question:</strong> ${c.question}</p><div class="dialog-financials live-grid">${liveCards}</div><p class="muted">Consensus period: ${est.periodEnd||'not available'} · Provider fundamentals/consensus timestamp: ${liveData.meta?.fundamentalsUpdatedAt?fmt.date(liveData.meta.fundamentalsUpdatedAt):'not configured'}.</p></div>
    <div class="deep-section"><h3>What to monitor</h3><ul class="monitor-list">${monitor}</ul></div>
    <div class="deep-section"><h3>Cross-stock read-through</h3><p>${r.readThrough}</p></div>
    <div class="dialog-section"><h3>What it owns</h3><p>${c.owns}</p></div><div class="dialog-section"><h3>Investment thesis</h3><p>${c.thesis}</p></div><div class="dialog-section"><h3>Principal risk</h3><p>${c.risk}</p></div><div class="dialog-section"><h3>Potential catalysts</h3><p>${c.catalyst}</p></div>
    <div class="deep-section"><h3>Primary issuer source</h3><a class="source-link deep-source" href="${r.source}" target="_blank" rel="noopener">${r.sourceLabel} ↗</a></div>
  </div>`;
  $('#companyDialog').showModal();
}

function renderBottlenecks(){
  const groups=[['Hardest bottlenecks','bottleneck'],['Best strategic position','strategic'],['Strongest earnings setup','earnings'],['Largest discrepancy','discrepancy'],['Highest convexity','convexity'],['Overall research opportunity','opportunity']];
  $('#bottleneckGrid').innerHTML=groups.map(([title,key])=>{const sorted=[...companies].sort((a,b)=>(key==='opportunity'?opportunity(b):b[key])-(key==='opportunity'?opportunity(a):a[key])).slice(0,8);return `<article class="panel rank-card"><div class="rank-head"><h3>${title}</h3><span class="pill">Top 8</span></div><div class="rank-list">${sorted.map((c,i)=>`<div class="rank-item" data-ticker="${c.ticker}"><span class="rank-num">${i+1}</span><div><strong>${c.name}</strong><br><small>${c.ticker} · ${c.layer}</small></div>${scoreBadge(key==='opportunity'?opportunity(c):c[key],key==='opportunity')}</div>`).join('')}</div></article>`;}).join('');
  $$('.rank-item').forEach(x=>x.addEventListener('click',()=>openCompany(x.dataset.ticker)));
}

function renderDependencies(){
  const cols=[0,1,2,3,4]; $('#dependencyMap').innerHTML=`<div class="flow-grid">${cols.map(col=>`<div class="flow-col"><div class="flow-label">${['Design','Tools & Inputs','Manufacture','Package & Validate','Systems & End Markets'][col]}</div>${dependencyNodes.filter(n=>n.col===col).map(n=>`<button class="flow-node" data-id="${n.id}"><strong>${n.label}</strong><small>${n.desc}</small></button>`).join('')}</div>`).join('')}</div>`; $$('.flow-node').forEach(n=>n.addEventListener('click',()=>showDependency(n.dataset.id)));
}
function showDependency(id){
  $$('.flow-node').forEach(x=>x.classList.toggle('active',x.dataset.id===id)); const n=dependencyNodes.find(x=>x.id===id); const comps=n.tickers.map(t=>companies.find(c=>c.ticker===t)).filter(Boolean); const needs=n.needs.map(x=>dependencyNodes.find(y=>y.id===x)).filter(Boolean);
  $('#dependencyDetail').innerHTML=`<div class="eyebrow">DEPENDENCY NODE</div><h3>${n.label}</h3><p class="muted">${n.desc}</p><ul class="detail-list"><li><strong>Public equities</strong><br>${comps.map(c=>`<button class="pill" data-open="${c.ticker}" style="margin:6px 4px 0 0;cursor:pointer">${c.ticker}</button>`).join('')}</li><li><strong>Depends on</strong><br>${needs.length?needs.map(x=>x.label).join(' · '):'Primarily upstream / foundational inputs'}</li><li><strong>Event read-through</strong><br>${n.read}</li></ul>`; $$('[data-open]').forEach(x=>x.addEventListener('click',()=>openCompany(x.dataset.open)));
}

function renderCycle(){ if(typeof cycleSignals==='undefined')return; $('#cycleGrid').innerHTML=cycleSignals.map(s=>`<article class="panel cycle-card"><div class="cycle-top"><h3>${s.name}</h3><span class="status-chip">${s.status}</span></div><div class="cycle-value">${s.value}</div><div class="cycle-change">${s.change}</div><p>${s.detail}</p><p class="implication"><strong>Investment read:</strong> ${s.implication}</p><a class="source-link" href="${s.source}" target="_blank" rel="noopener">Source ↗</a></article>`).join(''); }
function renderCatalysts(){
  if(typeof catalysts==='undefined')return;
  const d=x=>new Date(x+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const cutoff=new Date(); cutoff.setHours(0,0,0,0);
  const staticFuture=catalysts.filter(x=>new Date(x.date+'T23:59:59')>=cutoff);
  const byProvider=new Map();
  companies.forEach(c=>byProvider.set(c.ticker,c.ticker));
  const liveEvents=(liveData.meta?.earningsCalendar||[]).map(x=>({date:x.date,ticker:byProvider.get(x.symbol)||x.symbol,event:'Expected earnings date',why:'Provider calendar entry. Confirm the final date and time with the issuer before trading.',source:null,live:true})).filter(x=>x.date&&companies.some(c=>c.ticker===x.ticker));
  const merged=[...staticFuture];
  liveEvents.forEach(x=>{if(!merged.some(y=>y.date===x.date&&y.ticker===x.ticker))merged.push(x);});
  merged.sort((a,b)=>a.date.localeCompare(b.date)||a.ticker.localeCompare(b.ticker));
  $('#catalystList').innerHTML=merged.map(x=>`<article class="panel catalyst-item"><div class="catalyst-date">${d(x.date)}</div><span class="ticker">${x.ticker}</span><div class="catalyst-event"><strong>${x.event}</strong><span>${x.why}</span></div>${x.source?`<a class="source-link" href="${x.source}" target="_blank" rel="noopener">Issuer source ↗</a>`:'<span class="data-origin consensus">provider calendar</span>'}</article>`).join('') || '<div class="panel empty-state">No upcoming catalysts in the current snapshot.</div>';
}

function bindEvents(){
  $$('.tab').forEach(btn=>btn.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.remove('active'));$$('.tab-panel').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#'+btn.dataset.tab).classList.add('active');}));
  ['searchInput','layerFilter','aiFilter','sortSelect'].forEach(id=>$('#'+id).addEventListener(id==='searchInput'?'input':'change',renderTable));
  ['researchSearch','researchLayer','researchSort'].forEach(id=>$('#'+id).addEventListener(id==='researchSearch'?'input':'change',renderResearch));
  ['valuationSearch','frameworkFilter','valuationSort'].forEach(id=>$('#'+id).addEventListener(id==='valuationSearch'?'input':'change',renderValuation));
  $('#dialogClose').addEventListener('click',()=>$('#companyDialog').close()); $('#companyDialog').addEventListener('click',e=>{if(e.target===$('#companyDialog'))$('#companyDialog').close();});
}

async function loadLiveData(){
  try{
    const response=await fetch(`data/live.json?v=${Date.now()}`,{cache:'no-store'}); if(!response.ok)throw new Error(`HTTP ${response.status}`); liveData=await response.json();
  }catch(err){ console.warn('Live data unavailable; using static research fallback.',err); }
  renderDataStatus(); renderResearch(); renderValuation(); renderCatalysts();
}

populateSummary(); populateFilters(); bindEvents(); renderDataStatus(); renderResearch(); renderValuation(); renderTable(); renderBottlenecks(); renderCycle(); renderDependencies(); renderCatalysts(); loadLiveData();
