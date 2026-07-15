# Live Data Setup — Existing GitHub Pages Repository

The site works immediately as a static 57-company research product. The live valuation and consensus fields remain blank until a market-data provider is configured.

## 1. Upload v2 into the same repository

Replace the old v0.1/v1 files with the v2 files. Upload the folders too:

- `.github/workflows/`
- `data/`
- `scripts/`

Keep `index.html` at the repository root.

## 2. Create an FMP API key

The updater is written for Financial Modeling Prep's stable API. Your subscription must include the endpoints and international symbols you want to populate.

## 3. Store the key privately

In GitHub:

**Repository → Settings → Secrets and variables → Actions → New repository secret**

Name the secret exactly:

`FMP_API_KEY`

Paste the API key as the value. Never put the key in `app.js`, `index.html`, or another public repository file.

## 4. Run the first deep refresh

Go to:

**Actions → Update semiconductor market data → Run workflow**

Set:

`deep_refresh = true`

The workflow will fetch data, validate the output, and commit only these generated files when they change:

- `data/live.json`
- `data/estimate-history.json`

## 5. Confirm the site is live

Open the GitHub Pages URL. The header should show the provider and a quote timestamp instead of `Static research mode`.

The site warns when quote data is stale. Consensus-revision fields intentionally remain blank until the repository has accumulated enough daily snapshots to compare with 30-day and 90-day history.

## Update cadence

The included workflow requests:

- Quotes roughly every 30 minutes during the U.S. trading day.
- One post-close update.
- One daily integrity run.
- Fundamentals, consensus estimates and historical valuation data about once per day.

GitHub Actions is scheduled automation, not a streaming market-data server. Runs can be delayed. For tick-by-tick or sub-minute data, use a backend/serverless architecture instead of GitHub Pages alone.

## Troubleshooting

### The workflow fails with `FMP_API_KEY is not set`
The repository secret is missing or misnamed.

### The workflow can read data but cannot push
Check **Settings → Actions → General → Workflow permissions** and allow the workflow token to write repository contents, subject to your organization policy.

### Some international companies are blank
Provider symbol support and endpoint entitlements vary by plan. The site keeps the issuer-sourced static profile and leaves unsupported live fields blank rather than fabricating a value.

### 30-day and 90-day estimate revisions show `—`
That is expected at first. The system saves one consensus snapshot per day and only calculates revision momentum when genuine historical snapshots exist.
