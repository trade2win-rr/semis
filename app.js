const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const opportunity = c => Math.round((c.strategic*.30 + c.earnings*.25 + c.discrepancy*.25 + c.convexity*.20)*10)/10;
const scoreClass = n => n >= 8 ? 's-high' : n >= 6 ? 's-mid' : 's-low';
const scoreBadge = (n, opp=false) => `<span class="score ${opp?'s-opp':scoreClass(n)}">${n}</span>`;

function populateSummary(){
  const avg = companies.reduce((a,c)=>a+opportunity(c),0)/companies.length;
  const layers = new Set(companies.map(c=>c.layer)).size;
  const topBottle = [...companies].sort((a,b)=>b.bottleneck-a.bottleneck)[0];
  const topOpp = [...companies].sort((a,b)=>opportunity(b)-opportunity(a))[0];
  $('#summaryCards').innerHTML = `
    <div class="summary-stat"><strong>${companies.length}</strong><span>public companies mapped</span></div>
    <div class="summary-stat"><strong>${layers}</strong><span>industry layers</span></div>
    <div class="summary-stat"><strong>${avg.toFixed(1)}</strong><span>average opportunity score</span></div>
    <div class="summary-stat"><strong>${topBottle.ticker}</strong><span>top bottleneck · ${topBottle.bottleneck}/10</span></div>
    <div class="summary-stat" style="grid-column:1/-1"><strong>${topOpp.ticker}</strong><span>highest current framework opportunity · ${opportunity(topOpp).toFixed(1)}/10</span></div>`;
}

function populateFilters(){
  const layers = [...new Set(companies.map(c=>c.layer))].sort();
  $('#layerFilter').innerHTML += layers.map(x=>`<option value="${x}">${x}</option>`).join('');
}

function filteredCompanies(){
  const q = $('#searchInput').value.trim().toLowerCase();
  const layer = $('#layerFilter').value;
  const ai = $('#aiFilter').value;
  let list = companies.filter(c => {
    const blob = `${c.name} ${c.ticker} ${c.layer} ${c.owns} ${c.question} ${c.thesis}`.toLowerCase();
    return (!q || blob.includes(q)) && (layer==='all' || c.layer===layer) && (ai==='all' || c.ai>=Number(ai));
  });
  const sort = $('#sortSelect').value;
  const sorters = {
    opportunity:(a,b)=>opportunity(b)-opportunity(a), bottleneck:(a,b)=>b.bottleneck-a.bottleneck,
    strategic:(a,b)=>b.strategic-a.strategic, earnings:(a,b)=>b.earnings-a.earnings,
    discrepancy:(a,b)=>b.discrepancy-a.discrepancy, convexity:(a,b)=>b.convexity-a.convexity,
    ticker:(a,b)=>a.ticker.localeCompare(b.ticker)
  };
  return list.sort(sorters[sort]);
}

function renderTable(){
  const list = filteredCompanies();
  $('#resultCount').textContent = `${list.length} of ${companies.length} companies`;
  $('#companyRows').innerHTML = list.map(c=>`<tr data-ticker="${c.ticker}">
    <td class="sticky-col"><div class="company-name">${c.name}</div><span class="ticker">${c.ticker}</span></td>
    <td><span class="layer-tag">${c.layer}</span></td>
    <td>${c.owns}</td>
    <td>${scoreBadge(c.bottleneck)}</td>
    <td>${scoreBadge(c.strategic)}</td>
    <td>${scoreBadge(c.ai)}</td>
    <td>${scoreBadge(c.earnings)}</td>
    <td>${scoreBadge(c.discrepancy)}</td>
    <td>${scoreBadge(c.convexity)}</td>
    <td>${scoreBadge(opportunity(c),true)}</td>
    <td>${c.awareness}</td><td>${c.cycle}</td><td>${c.question}</td>
  </tr>`).join('');
  $$('#companyRows tr').forEach(row=>row.addEventListener('click',()=>openCompany(row.dataset.ticker)));
}

function openCompany(ticker){
  const c = companies.find(x=>x.ticker===ticker); if(!c) return;
  $('#dialogContent').innerHTML = `<div class="dialog-body">
    <div class="eyebrow">${c.layer}</div><h2>${c.name}</h2><div class="dialog-sub"><span class="ticker">${c.ticker}</span> · ${c.cycle} · Awareness: ${c.awareness}</div>
    <div class="dialog-scores">
      <div class="dialog-score"><strong>${c.bottleneck}</strong><span>Bottleneck</span></div>
      <div class="dialog-score"><strong>${c.strategic}</strong><span>Strategic</span></div>
      <div class="dialog-score"><strong>${c.ai}</strong><span>AI</span></div>
      <div class="dialog-score"><strong>${c.earnings}</strong><span>Earnings</span></div>
      <div class="dialog-score"><strong>${c.discrepancy}</strong><span>Discrepancy</span></div>
      <div class="dialog-score"><strong>${opportunity(c).toFixed(1)}</strong><span>Opportunity</span></div>
    </div>
    <div class="dialog-section"><h3>What it owns</h3><p>${c.owns}</p></div>
    <div class="dialog-section"><h3>Investment thesis</h3><p>${c.thesis}</p></div>
    <div class="dialog-section"><h3>The key question</h3><p>${c.question}</p></div>
    <div class="dialog-section"><h3>Principal risk</h3><p>${c.risk}</p></div>
    <div class="dialog-section"><h3>Potential catalysts</h3><p>${c.catalyst}</p></div>
  </div>`;
  $('#companyDialog').showModal();
}

function renderBottlenecks(){
  const groups = [
    ['Hardest bottlenecks','bottleneck'],['Best strategic position','strategic'],['Strongest earnings setup','earnings'],
    ['Largest discrepancy','discrepancy'],['Highest convexity','convexity'],['Overall opportunity','opportunity']
  ];
  $('#bottleneckGrid').innerHTML = groups.map(([title,key])=>{
    const sorted = [...companies].sort((a,b)=>(key==='opportunity'?opportunity(b):b[key])-(key==='opportunity'?opportunity(a):a[key])).slice(0,8);
    return `<article class="panel rank-card"><div class="rank-head"><h3>${title}</h3><span class="pill">Top 8</span></div>
      <div class="rank-list">${sorted.map((c,i)=>`<div class="rank-item" data-ticker="${c.ticker}"><span class="rank-num">${i+1}</span><div><strong>${c.name}</strong><br><small>${c.ticker} · ${c.layer}</small></div>${scoreBadge(key==='opportunity'?opportunity(c):c[key],key==='opportunity')}</div>`).join('')}</div></article>`;
  }).join('');
  $$('.rank-item').forEach(x=>x.addEventListener('click',()=>openCompany(x.dataset.ticker)));
}

function renderDependencies(){
  const cols = [0,1,2,3,4];
  $('#dependencyMap').innerHTML = `<div class="flow-grid">${cols.map(col=>`<div class="flow-col"><div class="flow-label">${['Design','Tools & Inputs','Manufacture','Package & Validate','Systems & End Markets'][col]}</div>${dependencyNodes.filter(n=>n.col===col).map(n=>`<button class="flow-node" data-id="${n.id}"><strong>${n.label}</strong><small>${n.desc}</small></button>`).join('')}</div>`).join('')}</div>`;
  $$('.flow-node').forEach(n=>n.addEventListener('click',()=>showDependency(n.dataset.id)));
}

function showDependency(id){
  $$('.flow-node').forEach(x=>x.classList.toggle('active',x.dataset.id===id));
  const n=dependencyNodes.find(x=>x.id===id);
  const comps=n.tickers.map(t=>companies.find(c=>c.ticker===t)).filter(Boolean);
  const needs=n.needs.map(x=>dependencyNodes.find(y=>y.id===x)).filter(Boolean);
  $('#dependencyDetail').innerHTML=`<div class="eyebrow">DEPENDENCY NODE</div><h3>${n.label}</h3><p class="muted">${n.desc}</p>
    <ul class="detail-list"><li><strong>Public equities</strong><br>${comps.map(c=>`<button class="pill" data-open="${c.ticker}" style="margin:6px 4px 0 0;cursor:pointer">${c.ticker}</button>`).join('')}</li>
    <li><strong>Depends on</strong><br>${needs.length?needs.map(x=>x.label).join(' · '):'Primarily upstream / foundational inputs'}</li>
    <li><strong>Event read-through</strong><br>${n.read}</li></ul>`;
  $$('[data-open]').forEach(x=>x.addEventListener('click',()=>openCompany(x.dataset.open)));
}

$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.tab').forEach(x=>x.classList.remove('active')); $$('.tab-panel').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active'); $('#'+btn.dataset.tab).classList.add('active');
}));
['searchInput','layerFilter','aiFilter','sortSelect'].forEach(id=>$('#'+id).addEventListener(id==='searchInput'?'input':'change',renderTable));
$('#dialogClose').addEventListener('click',()=>$('#companyDialog').close());
$('#companyDialog').addEventListener('click',e=>{ if(e.target===$('#companyDialog')) $('#companyDialog').close(); });

populateSummary(); populateFilters(); renderTable(); renderBottlenecks(); renderDependencies();
