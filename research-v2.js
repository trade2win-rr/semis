/* Research v2 extension: fills the deep-research layer for all 57 mapped companies.
   Company-reported figures are point-in-time facts. Live market/consensus data is overlaid from data/live.json. */

Object.assign(researchMeta, {
  version: 'v2.0 full research',
  asOf: 'July 15, 2026',
  deepDiveCount: 57,
  methodologyNote: 'Every mapped company now has a dated deep-research profile tied to a primary issuer source. Market prices, valuation ratios, consensus estimates and estimate revisions are separate live-data fields and carry their own timestamps.'
});

Object.assign(researchCompanies, {
  ASML: {
    latestPeriod:'Q2 2026', revenue:'€9.33B', growth:'Above prior guidance', margin:'54.0% gross margin',
    financialSignal:'Q2 sales and gross margin exceeded guidance. ASML raised 2026 sales guidance to €43B–€45B and gross margin to 54%–56% as AI-related logic and memory customers accelerated capacity plans.',
    monitor:['Low-NA EUV capacity expansion','High-NA insertion cadence','Order conversion and customer prepayments','China/export-control exposure'],
    readThrough:'ASML is the hardest equipment bottleneck. Stronger commitments pull through the broader leading-edge equipment complex; a booking or capacity pause would be an early capex warning.',
    nextCatalyst:'Q3 2026 results and EUV capacity conversion',
    sourceLabel:'ASML Q2 2026 results', source:'https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results'
  },
  '000660.KS': {
    latestPeriod:'Q1 2026', revenue:'KRW 52.58T', growth:'Record quarter', margin:'KRW 37.61T operating profit',
    financialSignal:'SK hynix reported record quarterly results as HBM and high-performance server memory remained the center of AI infrastructure demand.',
    monitor:['HBM4 and HBM4E ramp','Capacity allocation between HBM and conventional DRAM','Customer concentration','Competitor qualification progress'],
    readThrough:'The cleanest public read on HBM scarcity. Strong pricing supports MU and memory equipment demand; aggressive capacity expansion is the medium-term supply risk.',
    nextCatalyst:'Q2 2026 results and next-generation HBM qualification updates',
    sourceLabel:'SK hynix Q1 2026 results', source:'https://news.skhynix.com/q1-2026-business-results/'
  },
  '005930.KS': {
    latestPeriod:'Q1 2026', revenue:'KRW 133.9T consolidated', growth:'+43% QoQ', margin:'KRW 57.2T operating profit',
    financialSignal:'Samsung posted record consolidated results; the Device Solutions division generated KRW 81.7T of revenue and KRW 53.7T of operating profit, with memory driven by AI products and higher ASPs.',
    monitor:['HBM4/HBM4E customer qualification','Foundry yield and utilization','Memory capacity additions','Conglomerate capital allocation'],
    readThrough:'Samsung is simultaneously a memory supply signal, a foundry competitor to TSMC, and a major equipment buyer. Better execution can pressure MU/SK hynix while lifting WFE demand.',
    nextCatalyst:'Q2 2026 results and HBM4E customer sampling',
    sourceLabel:'Samsung Electronics Q1 2026 results', source:'https://news.samsung.com/global/samsung-electronics-announces-first-quarter-2026-results'
  },
  GFS: {
    latestPeriod:'Q1 2026', revenue:'$1.63B', growth:'+3% YoY', margin:'27.6% GAAP gross margin',
    financialSignal:'Revenue returned to modest year-over-year growth while utilization and specialty-node mix remain the key earnings variables.',
    monitor:['Factory utilization','Automotive/industrial recovery','Long-term agreements','U.S. manufacturing incentives'],
    readThrough:'GFS is a mature-node cycle indicator rather than a leading-edge AI proxy. Improving utilization is constructive for analog, auto and industrial semiconductor demand.',
    nextCatalyst:'Q2 2026 results — August 5, 2026',
    sourceLabel:'GlobalFoundries Q1 2026 results', source:'https://investors.gf.com/news-releases/news-release-details/globalfoundries-reports-first-quarter-2026-financial-results'
  },
  UMC: {
    latestPeriod:'Q1 2026', revenue:'NT$61.04B', growth:'+5.5% YoY', margin:'29.2% gross margin',
    financialSignal:'UMC delivered improving mature-node revenue with margins still primarily governed by utilization, pricing and mix rather than leading-edge AI scarcity.',
    monitor:['Wafer utilization','22/28nm mix','China mature-node capacity','Automotive/industrial inventory normalization'],
    readThrough:'UMC is a useful signal for broad mature-node conditions and foundry pricing outside the leading edge.',
    nextCatalyst:'Q2 2026 earnings — July 29, 2026',
    sourceLabel:'UMC quarterly results', source:'https://www.umc.com/en/Download/quarterly_results'
  },
  'ASM.AS': {
    latestPeriod:'Q1 2026', revenue:'€863M', growth:'Record demand mix', margin:'53.3% gross margin',
    financialSignal:'Logic/foundry demand and AI-related advanced-node investment supported strong profitability; adjusted operating margin reached 33.1%.',
    monitor:['Atomic layer deposition share','Gate-all-around intensity','China mix','Order intake'],
    readThrough:'ASM is a focused complexity beneficiary. Strong leading-edge transitions support deposition intensity even when unit growth is less dramatic.',
    nextCatalyst:'Q2 2026 results and order-intake commentary',
    sourceLabel:'ASM Q1 2026 report', source:'https://www.asm.com/downloads/25242322-quarterly-reports/2026-q1-quarterly-report'
  },
  '8035.T': {
    latestPeriod:'FY2026 ended Mar. 2026', revenue:'¥2.44T', growth:'+0.5% YoY', margin:'25.6% operating margin',
    financialSignal:'Tokyo Electron maintained high profitability through a mixed spending environment and remains broadly exposed to deposition, etch, coat/develop and cleaning intensity.',
    monitor:['FY2027 sales guide','Memory vs. logic mix','China normalization','Leading-edge process intensity'],
    readThrough:'TEL is a broad global WFE read-through; its commentary helps triangulate spending across logic, DRAM and NAND.',
    nextCatalyst:'FY2027 quarterly results and capex outlook updates',
    sourceLabel:'Tokyo Electron annual financial results', source:'https://www.tel.com/ir/library/report/index.html'
  },
  TER: {
    latestPeriod:'Q1 2026', revenue:'$1.28B', growth:'AI test mix drove scale', margin:'60.9% gross margin',
    financialSignal:'Semiconductor Test contributed $1.11B of Q1 revenue, making Teradyne a major beneficiary of rising device complexity and test content.',
    monitor:['AI accelerator test demand','Mobile/industrial test recovery','Robotics trajectory','Customer concentration'],
    readThrough:'Rising test time and complexity can make test spending grow faster than semiconductor units; weakness can flag device inventory or capex digestion.',
    nextCatalyst:'Q2 2026 results — July 28, 2026',
    sourceLabel:'Teradyne Q1 2026 results', source:'https://investors.teradyne.com/news-events/press-releases/detail/440/teradyne-reports-first-quarter-2026-results'
  },
  ONTO: {
    latestPeriod:'Q1 2026', revenue:'$291.9M', growth:'+9.5% YoY', margin:'50.0% GAAP gross margin',
    financialSignal:'Onto continued to benefit from advanced-node and packaging metrology demand, with Q2 guidance calling for further sequential growth.',
    monitor:['Advanced packaging revenue','HBM inspection demand','Dragonfly/JetStep adoption','Customer concentration'],
    readThrough:'A focused signal for heterogeneous integration and packaging complexity rather than raw wafer starts.',
    nextCatalyst:'Q2 2026 results and packaging guidance',
    sourceLabel:'Onto Innovation Q1 2026 results', source:'https://investors.ontoinnovation.com/news-releases'
  },
  ACLS: {
    latestPeriod:'Q1 2026', revenue:'$199.0M', growth:'Cycle trough conditions', margin:'40.5% GAAP gross margin',
    financialSignal:'Revenue remained subdued while profitability held positive; the stock setup is primarily about the timing and magnitude of an ion-implant recovery.',
    monitor:['Power-device capex','Silicon carbide demand','Customer utilization','Backlog conversion'],
    readThrough:'Axcelis is more cyclical and niche than the leading WFE names. A turn in power-device investment can create high earnings torque.',
    nextCatalyst:'Quarterly order and backlog inflection',
    sourceLabel:'Axcelis Q1 2026 results', source:'https://axcelis.gcs-web.com/news-releases/news-release-details/axcelis-announces-financial-results-first-quarter-2026'
  },
  ENTG: {
    latestPeriod:'Q1 2026', revenue:'$811.9M', growth:'+5% YoY', margin:'46.9% gross margin',
    financialSignal:'Sales improved with 23.6% adjusted operating margin as advanced-node materials purity and consumables demand supported the business.',
    monitor:['Advanced-node utilization','Materials content per wafer','Debt reduction','China exposure'],
    readThrough:'Entegris benefits from fab utilization and rising purity requirements, making it a recurring-consumables complement to capital equipment exposure.',
    nextCatalyst:'Q2 2026 results and advanced-node utilization',
    sourceLabel:'Entegris Q1 2026 results', source:'https://investor.entegris.com/news-releases'
  },
  AMKR: {
    latestPeriod:'Q1 2026', revenue:'$1.68B', growth:'+27% YoY', margin:'$239M gross profit',
    financialSignal:'Amkor posted record first-quarter sales as advanced packaging demand expanded, while the margin profile remains lower than the equipment and IP layers.',
    monitor:['Advanced packaging mix','U.S. fab buildout','Customer concentration','Capital intensity and returns'],
    readThrough:'Amkor translates chiplet and advanced-package volume into outsourced assembly/test demand; strong growth validates packaging capacity needs.',
    nextCatalyst:'Q2 2026 results and advanced-packaging capacity ramp',
    sourceLabel:'Amkor Q1 2026 results', source:'https://ir.amkor.com/news-releases/news-release-details/amkor-technology-reports-financial-results-first-quarter-2026'
  },
  ASX: {
    latestPeriod:'Q2 2026 revenue update', revenue:'NT$191.06B', growth:'+26.7% YoY', margin:'20.1% Q1 gross margin (latest full earnings)',
    financialSignal:'Q2 consolidated revenue rose 26.7% year over year and 10.0% sequentially, while ATM revenue rose 36.3% year over year. The latest full quarterly earnings showed a 20.1% gross margin in Q1.',
    monitor:['Advanced packaging revenue','Utilization','Capex','Electronics manufacturing mix'],
    readThrough:'ASE is a broad packaging-volume signal. Stronger AI package demand supports the thesis that more system value is moving into integration.',
    nextCatalyst:'Q2 2026 earnings conference and advanced-packaging capacity commentary',
    sourceLabel:'ASE Q2 2026 revenue update', source:'https://ir.aseglobal.com/html/ir_monthly.php'
  },
  MPWR: {
    latestPeriod:'Q1 2026', revenue:'$804.2M', growth:'+26.1% YoY', margin:'55.3% gross margin',
    financialSignal:'Monolithic Power continued rapid growth with high gross margins as power-management content increased across data center and other end markets.',
    monitor:['AI server power content','Customer concentration','Gross-margin durability','New product ramps'],
    readThrough:'MPS is a second-order AI beneficiary: higher compute density requires more sophisticated power delivery and management.',
    nextCatalyst:'Quarterly data-center growth and power-content updates',
    sourceLabel:'MPS Q1 2026 earnings materials', source:'https://www.monolithicpower.com/en/investor-relations.html'
  },
  TXN: {
    latestPeriod:'Q1 2026', revenue:'$4.83B', growth:'Industrial/auto recovery', margin:'$1.55B net income',
    financialSignal:'Revenue improved as the analog cycle recovered, while the key stock debate remains how utilization and aggressive internal manufacturing investment translate into long-run free cash flow.',
    monitor:['Industrial order recovery','Factory utilization','Inventory days','Capex and free-cash-flow conversion'],
    readThrough:'TI is one of the best broad analog-cycle signals. A sustained recovery supports MCHP, ADI and mature-node utilization.',
    nextCatalyst:'Q2 2026 results and factory-utilization commentary',
    sourceLabel:'Texas Instruments Q1 2026 results', source:'https://investor.ti.com/news-releases'
  },
  ADI: {
    latestPeriod:'Q2 FY2026', revenue:'$3.62B', growth:'+37% YoY', margin:'67.3% GAAP gross margin',
    financialSignal:'Analog Devices reported broad end-market growth and high gross margins as the industrial and communications cycle improved.',
    monitor:['Industrial bookings','Auto content growth','Inventory normalization','Operating leverage'],
    readThrough:'ADI is a high-quality analog recovery signal with more communications and instrumentation exposure than TI.',
    nextCatalyst:'Q3 FY2026 results and industrial demand update',
    sourceLabel:'Analog Devices Q2 FY2026 results', source:'https://investor.analog.com/news-releases'
  },
  NXPI: {
    latestPeriod:'Q1 2026', revenue:'$3.18B', growth:'+12% YoY', margin:'56.2% GAAP gross margin',
    financialSignal:'NXP returned to growth with solid automotive and edge exposure; non-GAAP operating margin was 33.1%.',
    monitor:['Auto production and content','China auto exposure','Industrial/IoT recovery','Inventory'],
    readThrough:'NXP is a focused signal for auto semiconductor content and edge connectivity rather than data-center AI.',
    nextCatalyst:'Q2 2026 results and automotive demand outlook',
    sourceLabel:'NXP Q1 2026 results', source:'https://investors.nxp.com/news-releases'
  },
  MCHP: {
    latestPeriod:'Q4 FY2026', revenue:'$1.31B', growth:'+35.1% YoY', margin:'61.0% GAAP gross margin',
    financialSignal:'Revenue recovered sharply year over year, showing strong operating leverage off a deep inventory correction.',
    monitor:['Bookings and cancellations','Distributor inventory','Factory utilization','Debt reduction'],
    readThrough:'Microchip is a high-beta industrial/embedded cycle recovery name; sustained orders validate a broader non-AI semiconductor upturn.',
    nextCatalyst:'Fiscal 2027 revenue recovery and debt-paydown updates',
    sourceLabel:'Microchip Q4 FY2026 results', source:'https://ir.microchip.com/news-events/press-releases'
  },
  ON: {
    latestPeriod:'Q1 2026', revenue:'$1.51B', growth:'Power cycle remains soft', margin:'38.5% gross margin',
    financialSignal:'Revenue remained pressured and GAAP operating margin was negative, leaving the thesis dependent on utilization, automotive/industrial recovery and power-semiconductor mix.',
    monitor:['Silicon carbide utilization','Auto EV demand','Industrial cycle','Restructuring benefits'],
    readThrough:'onsemi is a useful signal for automotive power and SiC demand, where supply additions can overwhelm structural content growth.',
    nextCatalyst:'Quarterly utilization and SiC demand updates',
    sourceLabel:'onsemi Q1 2026 results', source:'https://investor.onsemi.com/news-releases'
  },
  STM: {
    latestPeriod:'Q1 2026', revenue:'$3.10B', growth:'+23% YoY', margin:'33.8% gross margin',
    financialSignal:'Revenue rebounded while profitability remained below historical peaks, reflecting ongoing utilization and mix recovery.',
    monitor:['Auto/industrial inventory','Factory utilization','SiC demand','European manufacturing costs'],
    readThrough:'ST is a broad European auto/industrial cycle signal and a check on power-semiconductor recovery.',
    nextCatalyst:'Q2 2026 results and utilization outlook',
    sourceLabel:'STMicroelectronics Q1 2026 results', source:'https://investors.st.com/news-releases'
  },
  'IFX.DE': {
    latestPeriod:'Q2 FY2026', revenue:'€3.81B', growth:'Sequential recovery', margin:'17.1% segment result margin',
    financialSignal:'Infineon improved sequentially while power and automotive demand remained the central cycle variables.',
    monitor:['Auto semiconductor demand','Power/SiC utilization','Industrial orders','Inventory'],
    readThrough:'Infineon is a global power and automotive bellwether; stronger demand can confirm a broadening semiconductor recovery beyond AI.',
    nextCatalyst:'Q3 FY2026 results and full-year guidance',
    sourceLabel:'Infineon quarterly results', source:'https://www.infineon.com/cms/en/about-infineon/investor/reports-and-presentations/'
  },
  QCOM: {
    latestPeriod:'Q2 FY2026', revenue:'$10.6B', growth:'Auto + IoT +20% combined', margin:'$2.65 non-GAAP EPS',
    financialSignal:'Handset-related QCT revenue declined year over year, partly offset by record automotive revenue and growth in diversification businesses.',
    monitor:['Premium Android units','Automotive backlog conversion','PC/edge AI traction','Licensing economics'],
    readThrough:'Qualcomm shows whether edge AI and diversification can offset a mature smartphone profit pool.',
    nextCatalyst:'Q3 FY2026 results and edge/PC design wins',
    sourceLabel:'Qualcomm Q2 FY2026 results', source:'https://investor.qualcomm.com/files/doc_financials/2026/q2/FY2026-2nd-Quarter-Earnings-Release.pdf'
  },
  '2454.TW': {
    latestPeriod:'Q1 2026', revenue:'NT$149.15B', growth:'-2.7% YoY', margin:'46.3% gross margin',
    financialSignal:'MediaTek entered 2026 with mixed smartphone demand but continued optionality in premium mobile, connectivity and custom/AI silicon.',
    monitor:['Flagship smartphone share','Custom silicon programs','Networking/ASIC exposure','Gross-margin mix'],
    readThrough:'MediaTek is a key mobile/edge demand read and a potential custom-compute optionality story outside U.S. fabless leaders.',
    nextCatalyst:'Q2 2026 results and custom-silicon pipeline',
    sourceLabel:'MediaTek Q1 2026 results', source:'https://corp.mediatek.com/investor-relations/financial-information'
  },
  COHR: {
    latestPeriod:'Q3 FY2026', revenue:'$1.81B', growth:'Strong datacom demand', margin:'37.7% GAAP gross margin',
    financialSignal:'AI datacom and optical demand supported strong growth, while the broad portfolio leaves execution and mix as important drivers.',
    monitor:['800G/1.6T transceiver demand','Datacom mix','Laser capacity','Debt and portfolio simplification'],
    readThrough:'Coherent is a broad optical-component read on the migration of AI bottlenecks toward interconnect bandwidth.',
    nextCatalyst:'Q4 FY2026 results and 1.6T ramp commentary',
    sourceLabel:'Coherent Q3 FY2026 results', source:'https://investors.coherent.com/news-releases'
  },
  LITE: {
    latestPeriod:'Q3 FY2026', revenue:'$808.4M', growth:'AI optical acceleration', margin:'44.2% GAAP gross margin',
    financialSignal:'High-speed optical demand drove strong margins and a 32.2% non-GAAP operating margin.',
    monitor:['Cloud datacom mix','1.6T ramps','Customer concentration','Laser supply'],
    readThrough:'Lumentum is a high-beta optical read-through for hyperscaler data-center connectivity spend.',
    nextCatalyst:'Q4 FY2026 results and 1.6T demand',
    sourceLabel:'Lumentum Q3 FY2026 results', source:'https://investor.lumentum.com/news-releases'
  },
  RMBS: {
    latestPeriod:'Q1 2026', revenue:'$180.2M', growth:'Memory interface demand', margin:'34% operating margin',
    financialSignal:'Rambus continued to monetize memory-interface IP and products as higher bandwidth requirements increased system complexity.',
    monitor:['DDR5/next-gen interface adoption','Licensing billings','Memory controller mix','Customer concentration'],
    readThrough:'Rambus is a smaller IP/product toll road on rising memory bandwidth rather than commodity memory pricing.',
    nextCatalyst:'Q2 2026 results — July 27, 2026',
    sourceLabel:'Rambus Q1 2026 results', source:'https://investor.rambus.com/news-releases'
  },
  SIMO: {
    latestPeriod:'Q1 2026', revenue:'$342.1M', growth:'+105% YoY', margin:'47.1% GAAP gross margin',
    financialSignal:'Controller demand rebounded sharply, producing strong revenue growth and operating leverage.',
    monitor:['Client SSD demand','NAND pricing','Enterprise controller wins','Customer concentration'],
    readThrough:'Silicon Motion is a leveraged storage-controller cycle signal; sustained growth can confirm broad NAND demand improvement.',
    nextCatalyst:'Q2 2026 results — July 30, 2026',
    sourceLabel:'Silicon Motion Q1 2026 results', source:'https://ir.siliconmotion.com/news-releases'
  },
  WDC: {
    latestPeriod:'Q3 FY2026', revenue:'$3.34B', growth:'+45% YoY', margin:'50.2% gross margin',
    financialSignal:'Post-separation HDD economics strengthened materially as cloud demand and pricing supported high margins and cash generation.',
    monitor:['Nearline exabyte growth','HDD pricing discipline','Cloud customer concentration','HAMR execution'],
    readThrough:'Western Digital is now primarily a capacity-storage and cloud-demand read rather than a NAND composite.',
    nextCatalyst:'Q4 FY2026 results — August 5, 2026',
    sourceLabel:'Western Digital Q3 FY2026 results', source:'https://investor.wdc.com/news-releases'
  },
  STX: {
    latestPeriod:'Q3 FY2026', revenue:'$3.11B', growth:'Cloud storage strength', margin:'46.5% GAAP gross margin',
    financialSignal:'Strong nearline demand and disciplined supply drove exceptional margins and $953M of free cash flow.',
    monitor:['HAMR ramp','Nearline exabyte growth','Pricing discipline','Cloud capex'],
    readThrough:'Seagate is a direct signal for AI/cloud data growth translating into bulk storage demand.',
    nextCatalyst:'Q4/FY2026 results — July 28, 2026',
    sourceLabel:'Seagate Q3 FY2026 results', source:'https://investors.seagate.com/news-and-events/news-releases'
  },
  SNDK: {
    latestPeriod:'Q3 FY2026', revenue:'$5.95B', growth:'+251% YoY', margin:'78.4% GAAP gross margin',
    financialSignal:'Sandisk reported extraordinary flash pricing and mix, including rapid data-center growth; the valuation question is how much of current profitability is cyclical peak versus structurally improved discipline.',
    monitor:['NAND ASP trajectory','Data-center SSD mix','Industry capacity additions','Post-separation capital allocation'],
    readThrough:'A powerful signal for NAND pricing and flash-cycle profitability; rapid capacity response would reverse the same operating leverage.',
    nextCatalyst:'Q4/FY2026 results — August 5, 2026',
    sourceLabel:'Sandisk Q3 FY2026 results', source:'https://www.sandisk.com/company/newsroom/press-releases/2026/2026-04-30-sandisk-reports-fiscal-third-quarter-2026-financial-results'
  },
  NVMI: {
    latestPeriod:'Q1 2026', revenue:'$235.3M', growth:'+10% YoY', margin:'57.7% gross margin',
    financialSignal:'Nova remained a high-margin process-control grower with exposure to advanced logic, memory and increasingly complex metrology requirements.',
    monitor:['Advanced-node mix','Memory metrology','China exposure','Customer concentration'],
    readThrough:'Nova is a focused small-cap read on measurement intensity per wafer.',
    nextCatalyst:'Q2 2026 results — August 6, 2026',
    sourceLabel:'Nova Q1 2026 results', source:'https://ir.novami.com/news-releases'
  },
  CAMT: {
    latestPeriod:'Q1 2026', revenue:'$121.7M', growth:'+2.5% YoY', margin:'~51% non-GAAP gross margin',
    financialSignal:'Near-term growth moderated, but management expected a materially stronger second half as advanced packaging and HBM inspection demand converted.',
    monitor:['Second-half revenue ramp','HBM packaging demand','Customer concentration','Tool lead times'],
    readThrough:'Camtek is a focused indicator of packaging-inspection bottlenecks, where capacity timing can create sharp quarterly volatility.',
    nextCatalyst:'Q2 2026 results and second-half growth confirmation',
    sourceLabel:'Camtek Q1 2026 results', source:'https://www.camtek.com/investors/financial-reports/'
  },
  'BESI.AS': {
    latestPeriod:'Q1 2026', revenue:'€184.9M', growth:'+28.3% YoY', margin:'63.5% gross margin',
    financialSignal:'Orders rose 104.5% year over year to €269.7M, while Q2 guidance called for a major sequential revenue increase as advanced packaging demand accelerated.',
    monitor:['Hybrid bonding adoption','Order conversion','AI package mix','Customer concentration'],
    readThrough:'Besi is one of the highest-convexity public exposures to hybrid bonding moving from pilot to high-volume manufacturing.',
    nextCatalyst:'Q2 2026 results and hybrid-bonding order updates',
    sourceLabel:'Besi Q1 2026 results', source:'https://www.besi.com/investor-relations/financial-information/quarterly-results/'
  },
  '6857.T': {
    latestPeriod:'FY2025 ended Mar. 2026', revenue:'¥1.13T', growth:'+44.7% YoY', margin:'44.2% operating margin',
    financialSignal:'Advantest posted record annual results as AI/HPC and high-performance DRAM test demand drove 118.8% operating-profit growth.',
    monitor:['AI accelerator tester demand','HBM test intensity','Supply capacity','Customer concentration'],
    readThrough:'Advantest is among the clearest signals that more complex AI chips require more test time and higher-value test systems.',
    nextCatalyst:'FY2026 Q1 results — July 29, 2026',
    sourceLabel:'Advantest FY2025 results', source:'https://www.advantest.com/document/en/investors/ir-library/result/E_FR_FY2025_FN.pdf'
  },
  '6146.T': {
    latestPeriod:'FY2025 ended Mar. 2026', revenue:'¥436.9B', growth:'+11.1% YoY', margin:'~42% operating margin',
    financialSignal:'Disco combined exceptional profitability with growth as thinning, grinding and dicing intensity increased with advanced packaging.',
    monitor:['HBM wafer thinning','Advanced packaging mix','Equipment lead times','Customer capex'],
    readThrough:'Disco is a specialized process bottleneck whose economics can improve as packaging becomes more physically complex.',
    nextCatalyst:'FY2026 quarterly results and advanced-packaging demand',
    sourceLabel:'DISCO FY2025 results', source:'https://www.disco.co.jp/eg/ir/library/doc/film/20260422.pdf'
  },
  'SOI.PA': {
    latestPeriod:'FY2026', revenue:'€592M', growth:'-34% YoY', margin:'25.4% EBITDA margin',
    financialSignal:'Revenue contracted sharply and gross margin fell to 16.3%, leaving the thesis centered on utilization, customer inventories and recovery in specialty substrates.',
    monitor:['RF-SOI recovery','Auto substrate demand','Capacity utilization','Customer concentration'],
    readThrough:'Soitec is a specialty-materials recovery signal with little direct AI demand support; improvement would indicate broader handset and auto normalization.',
    nextCatalyst:'FY2027 trading updates and utilization recovery',
    sourceLabel:'Soitec FY2026 results', source:'https://www.soitec.com/docs/default-source/financial-documents/2025-2026/en/soitec-fy%2726-pr---en.pdf'
  },
  WOLF: {
    latestPeriod:'Q3 FY2026', revenue:'~$150M', growth:'Restructuring / transition', margin:'-27% GAAP gross margin',
    financialSignal:'Operations remained loss-making despite major cost and capital reductions; the equity thesis is dominated by balance-sheet repair, utilization and execution rather than demand growth alone.',
    monitor:['Liquidity and debt','Mohawk Valley utilization','Gross-margin inflection','SiC pricing'],
    readThrough:'Wolfspeed is a warning that strategic manufacturing assets do not guarantee attractive equity economics when utilization and leverage are adverse.',
    nextCatalyst:'Fiscal Q4 results, financing and utilization milestones',
    sourceLabel:'Wolfspeed Q3 FY2026 results', source:'https://investor.wolfspeed.com/financials/quarterly-results/default.aspx'
  },
  PI: {
    latestPeriod:'Q1 2026', revenue:'$74.3M', growth:'Adoption still uneven', margin:'49.1% GAAP gross margin',
    financialSignal:'Impinj remained a high-gross-margin item-connectivity platform, but adoption timing and deployment cycles continue to make growth lumpy.',
    monitor:['Endpoint IC volumes','Systems revenue','Retail/logistics deployments','Adjusted EBITDA'],
    readThrough:'Impinj is an edge-data infrastructure adoption story rather than a semiconductor-cycle bellwether.',
    nextCatalyst:'Q2 2026 results and large deployment wins',
    sourceLabel:'Impinj Q1 2026 results', source:'https://investor.impinj.com/news/press-release/2026/Impinj-Reports-First-Quarter-2026-Financial-Results/default.aspx'
  },
  AMBA: {
    latestPeriod:'Q1 FY2027', revenue:'$100.4M', growth:'+16.9% YoY', margin:'59.9% non-GAAP gross margin',
    financialSignal:'Edge AI revenue continued to expand, with the company also announcing a long-term Hanwha relationship that adds multi-year design-win optionality.',
    monitor:['Edge AI product mix','Automotive design wins','Hanwha revenue conversion','Operating leverage'],
    readThrough:'Ambarella is a focused test of whether physical/edge AI becomes a durable semiconductor growth pool outside data centers.',
    nextCatalyst:'Q2 FY2027 results and edge-AI design-win conversion',
    sourceLabel:'Ambarella Q1 FY2027 results', source:'https://investor.ambarella.com/news-releases/news-release-details/ambarella-inc-announces-first-quarter-fiscal-year-2027-financial'
  },
  LSCC: {
    latestPeriod:'Q1 2026', revenue:'$170.9M', growth:'+42% YoY', margin:'68.8% GAAP gross margin',
    financialSignal:'Lattice returned to strong growth with record compute and communications demand and high gross margins.',
    monitor:['Compute/communications growth','AMI integration','Industrial recovery','New FPGA platform adoption'],
    readThrough:'Lattice can benefit from control and connectivity content around AI systems without competing directly in accelerators.',
    nextCatalyst:'Q2 2026 results and AMI integration progress',
    sourceLabel:'Lattice Q1 2026 results', source:'https://ir.latticesemi.com/news-releases/news-release-details/lattice-semiconductor-reports-42-yoy-first-quarter-2026-revenue/'
  },
  MTSI: {
    latestPeriod:'Q2 FY2026', revenue:'$289.0M', growth:'+22.5% YoY', margin:'56.9% GAAP gross margin',
    financialSignal:'Revenue and margins expanded as data-center, telecom and defense demand supported a higher-quality growth mix.',
    monitor:['Data-center optical growth','Acquisition integration','Defense mix','Gross-margin durability'],
    readThrough:'MACOM is a diversified high-speed connectivity play that can benefit as AI networks require more analog and photonic content.',
    nextCatalyst:'Q3 FY2026 results and data-center growth',
    sourceLabel:'MACOM Q2 FY2026 results', source:'https://ir.macom.com/news-releases/news-release-details/macom-reports-fiscal-second-quarter-2026-financial-results/'
  },
  FORM: {
    latestPeriod:'Q1 2026', revenue:'$226.1M', growth:'+32.0% YoY', margin:'49.0% non-GAAP gross margin',
    financialSignal:'FormFactor posted record revenue, record DRAM demand and a sharp margin improvement, with HBM and networking probe demand driving the mix.',
    monitor:['HBM probe-card demand','Foundry/logic networking demand','Gross-margin durability','Customer concentration'],
    readThrough:'FormFactor is a smaller-cap expression of increasing test intensity at the wafer level, especially in HBM and advanced compute.',
    nextCatalyst:'Q2 2026 results and HBM demand',
    sourceLabel:'FormFactor Q1 2026 results', source:'https://investors.formfactor.com/news-releases/news-release-details/formfactor-inc-reports-2026-first-quarter-results/'
  }
});

// Remove inherited events that have already reported in this point-in-time build.
for (let i = catalysts.length - 1; i >= 0; i--) {
  if (catalysts[i].ticker === 'ASML' && catalysts[i].date <= '2026-07-15') catalysts.splice(i, 1);
}

// Refresh point-in-time industry signals and the static catalyst fallback for the Jul. 15, 2026 build.
cycleSignals.unshift({
  name:'ASML 2026 outlook', value:'€43B–€45B', change:'Raised Jul. 15', status:'Capex acceleration',
  detail:'After Q2 results, ASML raised 2026 sales guidance and guided to a higher full-year gross-margin range.',
  implication:'A powerful leading-edge capacity signal for EUV, advanced logic and memory. The key counter-risk is that expectations and customer capacity plans are now materially higher.',
  source:'https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results'
});

const additionalCatalysts = [
  {date:'2026-07-27',ticker:'RMBS',event:'Q2 2026 results',why:'Memory-interface demand is a read on bandwidth intensity beyond commodity memory pricing.',source:'https://investor.rambus.com/'},
  {date:'2026-07-28',ticker:'TER',event:'Q2 2026 results',why:'A direct signal for AI accelerator test intensity and broader semiconductor-test demand.',source:'https://investors.teradyne.com/'},
  {date:'2026-07-28',ticker:'STX',event:'Q4/FY2026 results',why:'Tests whether cloud storage pricing discipline and nearline demand remain exceptional.',source:'https://investors.seagate.com/'},
  {date:'2026-07-29',ticker:'UMC',event:'Q2 2026 results',why:'A clean mature-node utilization and pricing read-through.',source:'https://www.umc.com/en/IR/ir_overview'},
  {date:'2026-07-29',ticker:'6857.T',event:'FY2026 Q1 results',why:'Tests the durability of AI/HBM-driven tester demand after a record fiscal year.',source:'https://www.advantest.com/en/investors/ir-calendar/'},
  {date:'2026-07-30',ticker:'SIMO',event:'Q2 2026 results',why:'A read on controller demand and the breadth of the NAND/storage upcycle.',source:'https://ir.siliconmotion.com/'},
  {date:'2026-08-05',ticker:'GFS',event:'Q2 2026 results',why:'Mature-node utilization and industrial/auto demand can confirm or challenge a broader semiconductor recovery.',source:'https://investors.gf.com/'},
  {date:'2026-08-05',ticker:'WDC',event:'Q4 FY2026 results',why:'A direct read on cloud HDD demand, exabyte growth and pricing discipline.',source:'https://investor.wdc.com/'},
  {date:'2026-08-05',ticker:'SNDK',event:'Q4/FY2026 results',why:'Tests whether extraordinary NAND pricing and data-center flash economics are sustaining.',source:'https://www.sandisk.com/company/investors'},
  {date:'2026-08-06',ticker:'NVMI',event:'Q2 2026 results',why:'A focused read on advanced-node and memory metrology intensity.',source:'https://ir.novami.com/'}
];
additionalCatalysts.forEach(x=>{if(!catalysts.some(y=>y.date===x.date&&y.ticker===x.ticker)) catalysts.push(x);});
catalysts.sort((a,b)=>a.date.localeCompare(b.date));
