# Semiconductor Intelligence Map — Research v2.0

A static GitHub Pages research application covering **57 publicly traded companies** across the semiconductor stack.

## What changed in v2

- Deep, primary-source research profile for all 57 mapped companies.
- Separate provenance for issuer-reported facts, market data, consensus estimates and model-derived fields.
- Business-specific valuation frameworks rather than one universal P/E screen.
- Forward P/E, forward EV/Sales, EV/EBITDA, FCF yield, FY1 growth, historical valuation percentile and peer-relative valuation when the live provider supplies the inputs.
- Daily consensus snapshots used to calculate 30-day and 90-day estimate revisions. Revision fields intentionally remain blank until enough history accumulates.
- Expectations-burden model that combines live valuation, growth, historical context, peer context and estimate revisions.
- Automatic GitHub Actions updater with a private API key stored in GitHub Secrets.
- Stale-data warnings and a full static-research fallback if the provider is unavailable.
- Validation step that checks all 57 research profiles and generated JSON before every automated commit.

## Important: “real time” means automated near-real-time snapshots

GitHub Pages is a static public site. A private API key must not be placed in browser JavaScript. This project therefore uses a GitHub Action to fetch data securely and regenerate `data/live.json`.

The included workflow runs roughly every 30 minutes during the U.S. trading day, once after the close, and once daily for integrity. GitHub scheduling can be delayed, and the freshness/coverage of market data depends on the Financial Modeling Prep subscription attached to your API key. The website displays timestamps and warns when the quote snapshot is stale.

For true streaming or tick-by-tick data, move the updater to a persistent backend or serverless function designed for real-time delivery.

## Update your existing GitHub Pages repository

1. Download/unzip this v2 package.
2. In your existing repository, replace the old site files with the files from this folder. Preserve the directory structure, including `.github/workflows/`, `data/`, and `scripts/`.
3. Commit the changes to your existing `main` branch. Your GitHub Pages URL does not need to change.
4. Add the market-data secret:
   - Repository **Settings**
   - **Secrets and variables → Actions**
   - **New repository secret**
   - Name: `FMP_API_KEY`
   - Value: your Financial Modeling Prep API key
5. Open **Actions → Update semiconductor market data → Run workflow**.
6. For the first run, choose **deep refresh = true**.
7. After the workflow commits `data/live.json`, GitHub Pages will publish the new data through your existing branch-based deployment.

If the workflow cannot push, check **Settings → Actions → General → Workflow permissions** and make sure the repository allows the workflow token to write repository contents, subject to your organization’s policy.

## Data architecture

- `data.js` — 57-company industry map and qualitative research scores.
- `research.js` — original v1 core research profiles and cycle/catalyst data.
- `research-v2.js` — full 57-company research expansion and July 15, 2026 updates.
- `valuation-config.js` — business-specific valuation frameworks.
- `data/universe.json` — updater symbol/config universe.
- `data/live.json` — generated quote/fundamental/consensus snapshot.
- `data/estimate-history.json` — generated daily consensus history used for revision momentum.
- `scripts/update_data.py` — provider fetch, normalization and derived-metric engine.
- `scripts/validate_data.py` — integrity checks.
- `.github/workflows/update-market-data.yml` — scheduled secure updater.
- `SOURCE_AUDIT.md` — primary issuer source map for the static research layer.

## Valuation methodology

The site does **not** compare every semiconductor company using one multiple.

Examples:

- EDA/IP: forward EV/Sales, growth, recurring economics and historical valuation.
- AI compute/networking: forward P/E or EV/Sales plus estimate-revision momentum.
- Memory/storage: forward and normalized earnings, pricing/supply cycle and revisions.
- Foundries: EV/EBITDA, FCF, utilization and capital intensity.
- Equipment: forward earnings, historical range and cycle/order momentum.
- OSAT/packaging volume: EV/EBITDA and cash conversion.
- Distressed/turnaround equities: enterprise value, liquidity and margin inflection rather than P/E.

The **Expectations Burden** score is model-derived and is not a price target or recommendation.

## Provider notes

The updater is written for Financial Modeling Prep’s stable API. Endpoint entitlements and international symbol coverage vary by plan. A missing provider field stays blank; the script does not invent or interpolate consensus data.

## Verification

Run locally:

```bash
python scripts/validate_data.py
node --check app.js
node --check research-v2.js
node --check valuation-config.js
```

## Disclaimer

For research and educational use only. Verify market data, consensus data, company filings, event dates and calculations before making an investment or trading decision.
