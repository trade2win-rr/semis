const researchMeta = {
  version: 'v1.0 research',
  asOf: 'July 14, 2026',
  deepDiveCount: 16,
  methodologyNote: 'Financial snapshots use the latest company-reported quarter available before the July 14, 2026 close. Share prices are a July 14, 2026 market snapshot. Scores and valuation labels are research judgments, not consensus estimates or recommendations.'
};

const researchCompanies = {
  ASML: {
    latestPeriod:'Q1 2026', revenue:'€8.77B', growth:'+13% YoY', margin:'53.0% gross margin', price:'$1,775.64', valuation:'Extreme premium / monopoly quality',
    financialSignal:'Raised 2026 sales outlook to €36B–€40B as AI infrastructure demand accelerated customer capacity plans.',
    monitor:['Q2 bookings and EUV mix','High-NA adoption cadence','Memory vs. logic system mix','China/export-control exposure'],
    readThrough:'A stronger order book is positive for leading-edge foundry and memory capex; weaker bookings can hit the entire WFE complex before end demand visibly slows.',
    nextCatalyst:'Q2 2026 results — July 15, 2026',
    sourceLabel:'ASML Q1 2026 results', source:'https://www.asml.com/news/press-releases/2026/q1-2026-financial-results'
  },
  TSM: {
    latestPeriod:'Q1 2026 + Jun. monthly sales', revenue:'$35.90B Q1', growth:'June revenue +67.9% YoY', margin:'66.2% Q1 gross margin', price:'$420.39', valuation:'Premium with geopolitical discount',
    financialSignal:'Q2 guide called for $39.0B–$40.2B revenue and 65.5%–67.5% gross margin; first-half 2026 monthly revenue grew 35.6%.',
    monitor:['2nm yield and customer ramps','CoWoS / advanced packaging capacity','AI accelerator concentration','Overseas fab dilution'],
    readThrough:'TSMC is the cleanest demand pulse for leading-edge logic. Capex and packaging commentary transmit directly to ASML, KLAC, LRCX, AMAT and AI fabless names.',
    nextCatalyst:'Q2 2026 results — July 16, 2026',
    sourceLabel:'TSMC 2026 monthly revenue', source:'https://investor.tsmc.com/english/monthly-revenue/2026'
  },
  NVDA: {
    latestPeriod:'Q1 FY2027', revenue:'$81.6B', growth:'+85% YoY', margin:'74.9% GAAP gross margin', price:'$211.80', valuation:'Premium, earnings-supported',
    financialSignal:'Data Center revenue reached $75.2B, up 92% YoY. The investment debate is now durability of system-level dominance, not evidence of demand.',
    monitor:['Blackwell / next-gen supply cadence','Gross-margin normalization','Custom ASIC share shift','Networking and CPU attach'],
    readThrough:'NVIDIA demand pulls through TSMC leading-edge wafers, HBM, advanced packaging, test and high-speed networking.',
    nextCatalyst:'Next quarterly earnings / platform roadmap updates',
    sourceLabel:'NVIDIA Q1 FY2027 results', source:'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx'
  },
  AVGO: {
    latestPeriod:'Q2 FY2026', revenue:'$22.19B', growth:'+48% YoY', margin:'AI revenue $10.8B', price:'$389.11', valuation:'Very high expectations',
    financialSignal:'AI semiconductor revenue grew 143% YoY, driven by custom accelerators and AI networking.',
    monitor:['Number and scale of XPU customers','AI networking mix','VMware cash conversion','Customer concentration'],
    readThrough:'Broadcom is a key signal for the custom-silicon path versus merchant GPUs and for Ethernet scaling inside AI clusters.',
    nextCatalyst:'Custom AI accelerator and networking revenue updates',
    sourceLabel:'Broadcom Q2 FY2026 results', source:'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial'
  },
  AMD: {
    latestPeriod:'Q1 2026', revenue:'$10.3B', growth:'+38% YoY', margin:'53% GAAP gross margin', price:'$548.13', valuation:'Extreme execution premium',
    financialSignal:'Data Center revenue was $5.8B; Q2 guide of about $11.2B implied roughly 46% YoY growth.',
    monitor:['Instinct GPU ramp','EPYC share gains','Software ecosystem adoption','Supply / packaging availability'],
    readThrough:'A stronger AMD accelerator ramp increases pressure on NVIDIA share assumptions while remaining positive for TSMC, HBM and advanced packaging demand.',
    nextCatalyst:'Advancing AI — July 22–23; Q2 results — August 4, 2026',
    sourceLabel:'AMD Q1 2026 results', source:'https://ir.amd.com/news-events/press-releases/detail/1284/amd-reports-first-quarter-2026-financial-results'
  },
  MU: {
    latestPeriod:'Q3 FY2026', revenue:'$41.46B', growth:'+346% YoY', margin:'Data center revenue >$25B', price:'$983.12', valuation:'Cycle-sensitive despite exceptional earnings',
    financialSignal:'Micron said DRAM and NAND demand significantly exceeded supply and expected tight conditions to persist beyond calendar 2027.',
    monitor:['HBM mix and customer agreements','DRAM/NAND supply growth','Competitor capex','ASP and bit-shipment cadence'],
    readThrough:'MU is both an AI bottleneck signal and a memory-cycle signal. Stronger HBM economics can be positive for WFE even when future supply threatens commodity pricing.',
    nextCatalyst:'HBM capacity, contract and supply commentary',
    sourceLabel:'Micron Q3 FY2026 results', source:'https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter'
  },
  LRCX: {
    latestPeriod:'March 2026 quarter', revenue:'$5.84B', growth:'Sequential acceleration', margin:'49.8% gross margin', price:'$346.10', valuation:'High cycle premium',
    financialSignal:'Revenue rose from $5.35B in the December quarter to $5.84B in March, with memory intensity a central earnings driver.',
    monitor:['DRAM/HBM capex','NAND layer transitions','China revenue mix','Installed-base service growth'],
    readThrough:'Lam is one of the highest-torque ways to express rising memory process intensity, especially DRAM/HBM and complex 3D NAND transitions.',
    nextCatalyst:'June-quarter results — July 29, 2026',
    sourceLabel:'Lam March 2026 quarter results', source:'https://investor.lamresearch.com/2026-04-22-Lam-Research-Corporation-Reports-Financial-Results-for-the-Quarter-Ended-March-29%2C-2026'
  },
  AMAT: {
    latestPeriod:'Q2 FY2026', revenue:'$7.91B', growth:'+11% YoY', margin:'50.0% non-GAAP gross margin', price:'$595.70', valuation:'High cycle premium',
    financialSignal:'Record revenue and record DRAM revenue reinforced the broad equipment upcycle and memory spending recovery.',
    monitor:['DRAM and gate-all-around intensity','China mix','EPIC Center commercialization','Services growth'],
    readThrough:'Applied Materials is the broadest WFE read-through: strength can reflect foundry/logic, memory and advanced packaging simultaneously.',
    nextCatalyst:'Next quarterly results and WFE outlook',
    sourceLabel:'Applied Materials Q2 FY2026 results', source:'https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-second-quarter-2026-results/'
  },
  KLAC: {
    latestPeriod:'Q3 FY2026', revenue:'$3.42B', growth:'+11% YoY', margin:'61.3% YTD gross margin', price:'$230.37', valuation:'Premium quality WFE',
    financialSignal:'Revenue beat guidance and the company guided the June quarter to roughly $3.58B at midpoint.',
    monitor:['Inspection intensity per wafer','Advanced packaging metrology','Leading-edge node mix','Services growth'],
    readThrough:'KLA is the clearest complexity-leverage signal: rising defect costs and tighter process windows can grow inspection spend faster than wafer starts.',
    nextCatalyst:'Q4 FY2026 results — July 28, 2026',
    sourceLabel:'KLA Q3 FY2026 results', source:'https://ir.kla.com/news-events/press-releases/detail/514/kla-corporation-reports-fiscal-2026-third-quarter-results'
  },
  CDNS: {
    latestPeriod:'Q1 2026', revenue:'$1.47B', growth:'+19% YoY', margin:'44.7% non-GAAP op. margin', price:'$376.80', valuation:'Extreme recurring-growth premium',
    financialSignal:'Revenue growth accelerated with high margins as AI and custom silicon increased design complexity.',
    monitor:['Backlog / RPO','AI-driven EDA demand','Hardware emulation capacity','Large-system design wins'],
    readThrough:'More custom accelerators, chiplets and system complexity increase design iterations and verification demand even if no single chip architecture wins.',
    nextCatalyst:'Q2 2026 results — July 27, 2026',
    sourceLabel:'Cadence Q1 2026 results', source:'https://investor.cadence.com/news/news-details/2026/Cadence-Reports-First-Quarter-2026-Financial-Results/default.aspx'
  },
  SNPS: {
    latestPeriod:'Q2 FY2026', revenue:'$2.28B', growth:'+42% YoY', margin:'Integration-heavy quarter', price:'$425.90', valuation:'Premium / integration complexity',
    financialSignal:'Reported revenue rose sharply year over year as the business incorporated a larger systems-design footprint.',
    monitor:['Ansys integration','Organic EDA growth','Margin normalization','IP and verification demand'],
    readThrough:'Synopsys broadens the EDA thesis into system simulation; the core read-through is continued monetization of rising chip and system complexity.',
    nextCatalyst:'Integration milestones and next quarterly results',
    sourceLabel:'Synopsys Q2 FY2026 results', source:'https://news.synopsys.com/2026-05-27-Synopsys-Posts-Financial-Results-for-Second-Quarter-Fiscal-Year-2026'
  },
  ARM: {
    latestPeriod:'Q4 FY2026 / FY2026', revenue:'$1.49B quarter', growth:'+20% YoY; FY +23%', margin:'Royalty + licensing model', price:'$281.17', valuation:'Extreme platform optionality premium',
    financialSignal:'Fiscal-year revenue reached $4.9B as royalty and licensing growth broadened beyond smartphones into data center and edge AI.',
    monitor:['Data-center royalty mix','CSS adoption','Royalty rate uplift','RISC-V competition'],
    readThrough:'Arm is a signal for architectural share and IP economics rather than wafer demand alone; higher royalty capture can outgrow unit growth.',
    nextCatalyst:'Q1 FY2027 results — July 29, 2026',
    sourceLabel:'Arm Q4 FY2026 earnings call', source:'https://investors.arm.com/static-files/78526857-5997-46eb-9b65-0d3249d83711'
  },
  MRVL: {
    latestPeriod:'Q1 FY2027', revenue:'$2.42B', growth:'+28% YoY', margin:'58.9% non-GAAP gross margin', price:'$222.44', valuation:'High growth premium',
    financialSignal:'Record Q1 revenue; Q2 guide midpoint of $2.7B implied about 35% YoY growth with continued acceleration expected.',
    monitor:['Custom accelerator ramps','Electro-optics','Switch silicon','Customer concentration'],
    readThrough:'Marvell is a diversified read on custom silicon plus optical and electrical connectivity; it benefits if value shifts from compute toward data movement.',
    nextCatalyst:'Q2 FY2027 results and custom-silicon updates',
    sourceLabel:'Marvell Q1 FY2027 results', source:'https://investor.marvell.com/news-events/press-releases/detail/1023/marvell-technology-inc-reports-first-quarter-of-fiscal-year-2027-financial-results'
  },
  ANET: {
    latestPeriod:'Q1 2026', revenue:'$2.71B', growth:'+35.1% YoY', margin:'High-margin systems + software', price:'$182.57', valuation:'Premium quality networking',
    financialSignal:'Revenue growth accelerated and operating cash flow reached $1.69B as AI and cloud networking demand remained strong.',
    monitor:['AI back-end Ethernet share','Cloud titan concentration','1.6T adoption','Optics architecture changes'],
    readThrough:'Arista is a direct read on Ethernet winning more of the AI fabric and on hyperscaler networking capex.',
    nextCatalyst:'Q2 2026 results — August 4, 2026',
    sourceLabel:'Arista Q1 2026 results', source:'https://investors.arista.com/Communications/Press-Releases-and-Events/Press-Release-Detail/2026/Arista-Networks-Inc--Reports-First-Quarter-2026-Financial-Results/default.aspx'
  },
  CRDO: {
    latestPeriod:'Q4 FY2026', revenue:'$437.0M', growth:'+157% YoY', margin:'68.2% GAAP gross margin', price:'$236.18', valuation:'Extreme growth premium',
    financialSignal:'Revenue more than doubled year over year with strong margins as active electrical cables and high-speed connectivity scaled.',
    monitor:['Customer concentration','AEC share durability','Optical expansion','800G / 1.6T transitions'],
    readThrough:'Credo is a high-beta signal for AI rack-scale connectivity bottlenecks and the transition to higher-speed, lower-power links.',
    nextCatalyst:'Fiscal 2027 growth cadence and optical integration',
    sourceLabel:'Credo Q4 FY2026 results', source:'https://investors.credosemi.com/news-events/news/news-details/2026/Credo-Technology-Group-Holding-Ltd-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Financial-Results/default.aspx'
  },
  ALAB: {
    latestPeriod:'Q1 2026', revenue:'$308.4M', growth:'+93% YoY', margin:'76.3% GAAP gross margin', price:'$361.78', valuation:'Extreme growth premium',
    financialSignal:'Record revenue grew 14% sequentially and 93% year over year, driven by AI infrastructure connectivity demand.',
    monitor:['Scorpio switch ramp','PCIe/CXL attach','Hyperscaler concentration','Optical roadmap'],
    readThrough:'Astera is a focused signal that AI system bottlenecks are moving into rack-scale connectivity and fabric management.',
    nextCatalyst:'Q2 2026 results — August 4, 2026',
    sourceLabel:'Astera Labs Q1 2026 results', source:'https://www.asteralabs.com/news/astera-labs-reports-first-quarter-2026-financial-results/'
  }
};

const cycleSignals = [
  {name:'Global semiconductor sales',value:'$120.6B',change:'+104.1% YoY',status:'Very hot',detail:'May 2026 global sales rose 9.2% month over month on the WSTS three-month moving average.',implication:'End demand and pricing are both unusually strong; separate structural AI strength from cyclical peak risk.',source:'https://www.semiconductors.org/global-semiconductor-sales-increase-9-2-month-to-month-in-may/'},
  {name:'TSMC monthly revenue',value:'NT$442.7B',change:'+67.9% YoY',status:'Accelerating',detail:'June 2026 was the strongest monthly pulse in the current data set; first-half revenue grew 35.6%.',implication:'Leading-edge logic and AI demand remain powerful heading into Q2 results.',source:'https://investor.tsmc.com/english/monthly-revenue/2026'},
  {name:'Semiconductor equipment billings',value:'$36.55B',change:'+14% YoY',status:'Upcycle',detail:'Global equipment billings grew in Q1 2026, with the new mid-year forecast pointing to a multi-year expansion.',implication:'Positive for ASML, KLAC, LRCX and AMAT, but rising expectations raise the bar for order growth.',source:'https://www.semi.org/en/semi-press-release/semi-reports-global-semiconductor-equipment-billings-increased-14-percent-year-over-year-in-q1-2026'},
  {name:'DRAM equipment outlook',value:'$38.8B',change:'+39% in 2026',status:'Memory capex surge',detail:'SEMI projects sharply higher DRAM equipment sales, supported by HBM and advanced DRAM node migration.',implication:'High positive read-through for memory-focused WFE; eventual supply response is the counter-risk for MU.',source:'https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-sales-forecast-to-reach-a-record-229-billion-dollars-in-2028-semi-reports'},
  {name:'Electronic design market',value:'$5.75B',change:'+12.7% YoY',status:'Structural growth',detail:'Q1 2026 EDA, semiconductor IP and design-services revenue continued double-digit growth.',implication:'Supports the thesis that custom silicon and chip complexity are durable toll roads for CDNS, SNPS and ARM.',source:'https://www.semi.org/en/semi-press-release/esd-alliance-reports-electronic-system-design-industry-posts-5.7-billion-dollars-in-revenue-in-q1-2026'},
  {name:'AI connectivity leaders',value:'CRDO +157% / ALAB +93%',change:'Revenue growth',status:'Bottleneck migration',detail:'Connectivity specialists are growing far faster than the broader semiconductor market.',implication:'The AI constraint is broadening from accelerators into scale-up, scale-out and rack-level data movement.',source:'https://investors.credosemi.com/news-events/news/news-details/2026/Credo-Technology-Group-Holding-Ltd-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Financial-Results/default.aspx'}
];

const catalysts = [
  {date:'2026-07-15',ticker:'ASML',event:'Q2 2026 results',why:'Bookings, EUV mix and 2026/2027 demand commentary can move the entire equipment complex.',source:'https://www.asml.com/investors/financial-calendar'},
  {date:'2026-07-16',ticker:'TSM',event:'Q2 2026 results',why:'The most important near-term read on AI wafer demand, advanced-node utilization and CoWoS capacity.',source:'https://investor.tsmc.com/english/financial-calendar'},
  {date:'2026-07-22',ticker:'AMD',event:'Advancing AI 2026 begins',why:'Product roadmap and customer adoption can reset expectations for accelerator share and ecosystem breadth.',source:'https://ir.amd.com/news-events/ir-calendar'},
  {date:'2026-07-27',ticker:'CDNS',event:'Q2 2026 results',why:'A direct read on custom-silicon design intensity, backlog and EDA spending.',source:'https://investor.cadence.com/overview/default.aspx'},
  {date:'2026-07-28',ticker:'KLAC',event:'Q4 FY2026 results',why:'Inspection intensity and WFE outlook are key signals for advanced-node and packaging complexity.',source:'https://ir.kla.com/news-events/press-releases/detail/517/kla-announces-fourth-quarter-fiscal-year-2026-earnings-date'},
  {date:'2026-07-29',ticker:'ARM',event:'Q1 FY2027 results',why:'Royalty growth and data-center exposure test the platform-expansion thesis.',source:'https://investors.arm.com/financials/quarterly-annual-results/'},
  {date:'2026-07-29',ticker:'LRCX',event:'June-quarter results',why:'Memory and HBM capex commentary can transmit directly to MU and the broader equipment group.',source:'https://investor.lamresearch.com/events'},
  {date:'2026-08-04',ticker:'AMD',event:'Q2 2026 results',why:'Tests the roughly 46% YoY revenue-growth guide and the pace of data-center acceleration.',source:'https://ir.amd.com/news-events/ir-calendar'},
  {date:'2026-08-04',ticker:'ANET',event:'Q2 2026 results',why:'A major read on Ethernet AI fabrics and hyperscaler networking spend.',source:'https://investors.arista.com/Home/default.aspx'},
  {date:'2026-08-04',ticker:'ALAB',event:'Q2 2026 results',why:'Tests whether rack-scale connectivity growth is sustaining after a 93% YoY Q1 increase.',source:'https://asteralabs.gcs-web.com/'}
];
