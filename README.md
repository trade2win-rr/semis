# Semiconductor Intelligence Map

A static research site mapping publicly traded semiconductor companies by bottleneck control, strategic position, AI exposure, earnings setup, valuation discrepancy, convexity, and dependency relationships.

## Files

- `index.html` — page structure
- `styles.css` — visual design
- `data.js` — company research data and scores
- `app.js` — filtering, sorting, rankings, detail dialog and dependency map
- `.nojekyll` — tells GitHub Pages to serve the files as-is

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `semiconductor-intelligence-map`.
2. Upload all files in this folder to the repository root.
3. Open the repository's **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. GitHub will publish the site at a URL similar to:
   `https://YOUR-USERNAME.github.io/semiconductor-intelligence-map/`

## Editing the research

Most content lives in `data.js`. Add or edit company objects there. The table, rankings, summary cards and company detail modal update automatically.

## Important research note

The current release is a curated framework, not a live financial database. Scores are subjective research judgments and should be updated as business conditions, valuation, earnings estimates and competitive positions change.
