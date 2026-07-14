# Semiconductor Intelligence Map — Research v1.0

A static, GitHub-Pages-ready semiconductor industry research database.

## What is included

- 57 publicly traded companies mapped across the semiconductor stack
- 16 deep-research company profiles with dated financial snapshots and primary-source links
- Strategic-position, bottleneck, earnings-setup, discrepancy and convexity scores
- Current industry cycle dashboard
- Dependency / event-transmission map
- Upcoming catalyst calendar
- Search, filtering, sorting and company detail dialogs

## Files

- `index.html` — page structure
- `styles.css` — visual design
- `data.js` — broad 57-company industry map and dependency graph
- `research.js` — dated financial snapshots, cycle signals and catalyst calendar
- `app.js` — search, filtering, rankings and interactive rendering

## Publish on GitHub Pages

1. Create a public GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then save.

The site is fully static: no server, database or API key is required.

## Updating the research

Most ongoing updates happen in `research.js`:

- Update company financial snapshots after earnings.
- Update the `cycleSignals` array when new industry data arrives.
- Add or remove items from the `catalysts` array.
- Keep the `asOf` date in `researchMeta` current.

The broad qualitative company map is maintained in `data.js`.

## Important

Financial figures are point-in-time research snapshots. Scores, valuation labels and opportunity rankings are research judgments, not investment recommendations. Verify all figures before trading or publishing.
