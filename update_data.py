#!/usr/bin/env python3
import json, re, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
universe=json.loads((ROOT/'data/universe.json').read_text())
live=json.loads((ROOT/'data/live.json').read_text())
history=json.loads((ROOT/'data/estimate-history.json').read_text())
assert len(universe)==57, f"Expected 57 companies, found {len(universe)}"
assert len({x['ticker'] for x in universe})==57, "Duplicate tickers in universe"
assert isinstance(live.get('companies'),dict), 'live.json companies must be an object'
assert isinstance(history.get('snapshots'),list), 'estimate-history snapshots must be a list'
# Validate deep research coverage by reading JS object keys from base + extension.
base=(ROOT/'research.js').read_text()
ext=(ROOT/'research-v2.js').read_text()
keys=set(re.findall(r"^\s{2}(['\"]?)([A-Za-z0-9_.]+)\1:\s*\{", base+"\n"+ext, re.M))
keys={k[1] for k in keys}
missing=[x['ticker'] for x in universe if x['ticker'] not in keys]
assert not missing, f"Missing deep research profiles: {missing}"
print(f"OK: {len(universe)} companies, full research coverage, live-data schema valid")
