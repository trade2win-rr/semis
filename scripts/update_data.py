#!/usr/bin/env python3
"""Update live market, valuation and consensus data for the Semiconductor Intelligence Map.

Designed for GitHub Actions. The site remains usable without an API key because it always
falls back to issuer-sourced static research profiles.

Provider: Financial Modeling Prep (FMP). Endpoint availability varies by subscription.
The script is deliberately fault-tolerant: a failed endpoint preserves the last good value.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import os
import statistics
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
UNIVERSE_PATH = ROOT / "data" / "universe.json"
LIVE_PATH = ROOT / "data" / "live.json"
HISTORY_PATH = ROOT / "data" / "estimate-history.json"
BASE = "https://financialmodelingprep.com/stable"
UTC = dt.timezone.utc


def now_iso() -> str:
    return dt.datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def parse_iso(value: str | None) -> dt.datetime | None:
    if not value:
        return None
    try:
        return dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def load_json(path: Path, default: Any) -> Any:
    try:
        return json.loads(path.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def save_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def finite(value: Any) -> float | None:
    try:
        number = float(value)
        return number if math.isfinite(number) else None
    except (TypeError, ValueError):
        return None


def first_number(obj: dict[str, Any] | None, *keys: str) -> float | None:
    if not obj:
        return None
    for key in keys:
        value = finite(obj.get(key))
        if value is not None:
            return value
    return None


def first_value(obj: dict[str, Any] | None, *keys: str) -> Any:
    if not obj:
        return None
    for key in keys:
        value = obj.get(key)
        if value is not None and value != "":
            return value
    return None


class FMP:
    def __init__(self, api_key: str, pause: float = 0.12) -> None:
        self.api_key = api_key
        self.pause = pause
        self.errors: list[str] = []

    def get(self, endpoint: str, **params: Any) -> Any:
        params = {k: v for k, v in params.items() if v is not None}
        params["apikey"] = self.api_key
        url = f"{BASE}/{endpoint}?{urllib.parse.urlencode(params)}"
        request = urllib.request.Request(url, headers={"User-Agent": "semiconductor-intelligence-map/2.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
            time.sleep(self.pause)
            if isinstance(payload, dict) and (payload.get("Error Message") or payload.get("error")):
                raise RuntimeError(str(payload))
            return payload
        except Exception as exc:  # network/provider failures should not erase the last good snapshot
            self.errors.append(f"{endpoint} {params.get('symbol','')}: {exc}")
            return None


def normalize_quote(raw: dict[str, Any]) -> dict[str, Any]:
    return {
        "price": first_number(raw, "price"),
        "change": first_number(raw, "change"),
        "changePercent": first_number(raw, "changesPercentage", "changePercentage"),
        "marketCap": first_number(raw, "marketCap"),
        "volume": first_number(raw, "volume"),
        "avgVolume": first_number(raw, "avgVolume", "averageVolume"),
        "dayLow": first_number(raw, "dayLow", "low"),
        "dayHigh": first_number(raw, "dayHigh", "high"),
        "yearLow": first_number(raw, "yearLow"),
        "yearHigh": first_number(raw, "yearHigh"),
        "exchange": first_value(raw, "exchange", "exchangeFullName"),
        "currency": first_value(raw, "currency"),
        "name": first_value(raw, "name"),
    }


def choose_annual_estimate(rows: list[dict[str, Any]] | None) -> dict[str, Any] | None:
    if not rows:
        return None
    today = dt.date.today()
    candidates = []
    for row in rows:
        period = str(first_value(row, "period", "fiscalPeriod") or "").lower()
        date_raw = first_value(row, "date", "calendarYear", "fiscalYear")
        date_obj = None
        if date_raw:
            try:
                text = str(date_raw)
                if len(text) == 4 and text.isdigit():
                    date_obj = dt.date(int(text), 12, 31)
                else:
                    date_obj = dt.date.fromisoformat(text[:10])
            except ValueError:
                pass
        if period and period not in {"annual", "fy", "year", "fiscal year"}:
            continue
        if date_obj and date_obj < today - dt.timedelta(days=60):
            continue
        candidates.append((date_obj or dt.date.max, row))
    if not candidates:
        # Some provider plans omit period labels. Prefer the nearest future-dated row.
        for row in rows:
            date_raw = first_value(row, "date", "calendarYear", "fiscalYear")
            try:
                text = str(date_raw)
                date_obj = dt.date(int(text), 12, 31) if len(text) == 4 and text.isdigit() else dt.date.fromisoformat(text[:10])
            except Exception:
                continue
            if date_obj >= today - dt.timedelta(days=60):
                candidates.append((date_obj, row))
    return sorted(candidates, key=lambda x: x[0])[0][1] if candidates else (rows[0] if rows else None)


def normalize_estimate(row: dict[str, Any] | None) -> dict[str, Any]:
    if not row:
        return {}
    return {
        "periodEnd": first_value(row, "date", "calendarYear", "fiscalYear"),
        "revenueAvg": first_number(row, "revenueAvg", "estimatedRevenueAvg", "estimatedRevenueAverage"),
        "revenueLow": first_number(row, "revenueLow", "estimatedRevenueLow"),
        "revenueHigh": first_number(row, "revenueHigh", "estimatedRevenueHigh"),
        "epsAvg": first_number(row, "epsAvg", "estimatedEpsAvg", "estimatedEPSAvg", "estimatedEpsAverage"),
        "epsLow": first_number(row, "epsLow", "estimatedEpsLow", "estimatedEPSLow"),
        "epsHigh": first_number(row, "epsHigh", "estimatedEpsHigh", "estimatedEPSHigh"),
        "numberAnalystsRevenue": first_number(row, "numberAnalystsEstimatedRevenue", "numberAnalystEstimatedRevenue"),
        "numberAnalystsEps": first_number(row, "numberAnalystsEstimatedEps", "numberAnalystEstimatedEps"),
    }


def normalize_metrics(metrics: dict[str, Any] | None, ratios: dict[str, Any] | None, income_ttm: dict[str, Any] | None = None) -> dict[str, Any]:
    return {
        "enterpriseValue": first_number(metrics, "enterpriseValueTTM", "enterpriseValue"),
        "evToSalesTTM": first_number(metrics, "evToSalesTTM", "evToSales"),
        "evToEbitdaTTM": first_number(metrics, "enterpriseValueOverEBITDATTM", "evToEBITDATTM", "evToEBITDA"),
        "peTTM": first_number(ratios, "priceToEarningsRatioTTM", "priceEarningsRatioTTM", "priceToEarningsRatio", "peRatio"),
        "priceToSalesTTM": first_number(ratios, "priceToSalesRatioTTM", "priceSalesRatioTTM", "priceToSalesRatio"),
        "fcfYield": first_number(metrics, "freeCashFlowYieldTTM", "freeCashFlowYield"),
        "netDebtToEbitda": first_number(metrics, "netDebtToEBITDATTM", "netDebtToEBITDA"),
        "roic": first_number(metrics, "returnOnInvestedCapitalTTM", "roicTTM", "roic"),
        "revenueTTM": first_number(income_ttm, "revenue"),
        "epsDilutedTTM": first_number(income_ttm, "epsDiluted", "epsdiluted", "eps"),
        "netIncomeTTM": first_number(income_ttm, "netIncome"),
    }


def historical_series(rows: list[dict[str, Any]] | None) -> dict[str, list[float]]:
    out = {"pe": [], "evSales": [], "evEbitda": []}
    for row in rows or []:
        for target, keys in {
            "pe": ("peRatio", "priceToEarningsRatio"),
            "evSales": ("evToSales", "enterpriseValueToSales"),
            "evEbitda": ("enterpriseValueOverEBITDA", "evToEBITDA"),
        }.items():
            value = first_number(row, *keys)
            if value is not None and 0 < value < 500:
                out[target].append(value)
    return out


def percentile_of_history(current: float | None, history: list[float]) -> float | None:
    if current is None or len(history) < 4:
        return None
    return round(100 * sum(v <= current for v in history) / len(history), 1)


def pct_change(new: float | None, old: float | None) -> float | None:
    if new is None or old in (None, 0):
        return None
    return round((new / old - 1) * 100, 2)


def closest_history_snapshot(snapshots: list[dict[str, Any]], target: dt.datetime) -> dict[str, Any] | None:
    candidates = []
    for snap in snapshots:
        ts = parse_iso(snap.get("timestamp"))
        if ts:
            candidates.append((abs((ts - target).total_seconds()), snap))
    return min(candidates, key=lambda x: x[0])[1] if candidates else None


def update_revision_fields(live: dict[str, Any], history: dict[str, Any]) -> None:
    snapshots = history.get("snapshots", [])
    now = dt.datetime.now(UTC)
    for ticker, company in live.get("companies", {}).items():
        estimate = company.get("estimates", {})
        current_rev = finite(estimate.get("revenueAvg"))
        current_eps = finite(estimate.get("epsAvg"))
        for days in (30, 90):
            old = closest_history_snapshot(snapshots, now - dt.timedelta(days=days))
            old_company = (old or {}).get("companies", {}).get(ticker, {})
            company.setdefault("derived", {})[f"revenueEstimateRevision{days}d"] = pct_change(current_rev, finite(old_company.get("revenueAvg")))
            company.setdefault("derived", {})[f"epsEstimateRevision{days}d"] = pct_change(current_eps, finite(old_company.get("epsAvg")))


def compute_derived(company: dict[str, Any]) -> None:
    quote = company.get("quote", {})
    metrics = company.get("metrics", {})
    est = company.get("estimates", {})
    price = finite(quote.get("price"))
    market_cap = finite(quote.get("marketCap"))
    ev = finite(metrics.get("enterpriseValue"))
    revenue = finite(est.get("revenueAvg"))
    eps = finite(est.get("epsAvg"))
    derived = company.setdefault("derived", {})
    derived["forwardPE"] = round(price / eps, 2) if price and eps and eps > 0 else None
    derived["forwardEvSales"] = round(ev / revenue, 2) if ev and revenue and revenue > 0 else None
    # Fallback if EV is unavailable: market-cap-to-sales is labeled as such in the UI.
    derived["forwardMarketCapSales"] = round(market_cap / revenue, 2) if market_cap and revenue and revenue > 0 else None
    revenue_ttm = finite(metrics.get("revenueTTM"))
    eps_ttm = finite(metrics.get("epsDilutedTTM"))
    derived["revenueGrowthFY1"] = round((revenue / revenue_ttm - 1) * 100, 2) if revenue and revenue_ttm and revenue_ttm > 0 else None
    derived["epsGrowthFY1"] = round((eps / eps_ttm - 1) * 100, 2) if eps and eps_ttm and eps_ttm > 0 else None
    derived["historicalPePercentile"] = percentile_of_history(metrics.get("peTTM"), company.get("history", {}).get("pe", []))
    derived["historicalEvSalesPercentile"] = percentile_of_history(metrics.get("evToSalesTTM"), company.get("history", {}).get("evSales", []))


def deep_refresh_due(meta: dict[str, Any], hours: int = 18) -> bool:
    last = parse_iso(meta.get("fundamentalsUpdatedAt"))
    return last is None or (dt.datetime.now(UTC) - last) > dt.timedelta(hours=hours)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--deep", action="store_true", help="Force fundamentals/estimates/history refresh")
    args = parser.parse_args()

    api_key = os.environ.get("FMP_API_KEY", "").strip()
    if not api_key:
        print("FMP_API_KEY is not set. Static research fallback remains intact.", file=sys.stderr)
        return 2

    universe = load_json(UNIVERSE_PATH, [])
    live = load_json(LIVE_PATH, {"meta": {}, "companies": {}})
    history = load_json(HISTORY_PATH, {"snapshots": []})
    live.setdefault("meta", {})
    live.setdefault("companies", {})
    fmp = FMP(api_key)
    symbols = [row["providerSymbol"] for row in universe]
    symbol_to_ticker = {row["providerSymbol"]: row["ticker"] for row in universe}

    # Quotes: one batch request each run.
    quotes_raw = fmp.get("batch-quote", symbols=",".join(symbols))
    if isinstance(quotes_raw, list):
        for raw in quotes_raw:
            symbol = str(raw.get("symbol", ""))
            ticker = symbol_to_ticker.get(symbol, symbol)
            if ticker in {x["ticker"] for x in universe}:
                live["companies"].setdefault(ticker, {})["quote"] = normalize_quote(raw)
        live["meta"]["quotesUpdatedAt"] = now_iso()

    do_deep = args.deep or deep_refresh_due(live["meta"])
    if do_deep:
        start = dt.date.today().isoformat()
        end = (dt.date.today() + dt.timedelta(days=120)).isoformat()
        earnings_raw = fmp.get("earnings-calendar", **{"from": start, "to": end})
        if isinstance(earnings_raw, list):
            allowed = set(symbols)
            live["meta"]["earningsCalendar"] = [
                {
                    "symbol": row.get("symbol"),
                    "date": row.get("date"),
                    "time": row.get("time"),
                    "epsEstimated": row.get("epsEstimated"),
                    "revenueEstimated": row.get("revenueEstimated"),
                }
                for row in earnings_raw if row.get("symbol") in allowed
            ]
    if do_deep:
        for idx, row in enumerate(universe, 1):
            ticker, symbol = row["ticker"], row["providerSymbol"]
            print(f"[{idx:02d}/{len(universe)}] {ticker}")
            company = live["companies"].setdefault(ticker, {})
            key_metrics_raw = fmp.get("key-metrics-ttm", symbol=symbol)
            ratios_raw = fmp.get("ratios-ttm", symbol=symbol)
            estimates_raw = fmp.get("financial-estimates", symbol=symbol, period="annual", limit=8)
            income_ttm_raw = fmp.get("income-statement-ttm", symbol=symbol)
            history_raw = fmp.get("key-metrics", symbol=symbol, period="quarter", limit=20)

            metrics_obj = key_metrics_raw[0] if isinstance(key_metrics_raw, list) and key_metrics_raw else (key_metrics_raw if isinstance(key_metrics_raw, dict) else None)
            ratios_obj = ratios_raw[0] if isinstance(ratios_raw, list) and ratios_raw else (ratios_raw if isinstance(ratios_raw, dict) else None)
            income_ttm_obj = income_ttm_raw[0] if isinstance(income_ttm_raw, list) and income_ttm_raw else (income_ttm_raw if isinstance(income_ttm_raw, dict) else None)
            normalized = normalize_metrics(metrics_obj, ratios_obj, income_ttm_obj)
            company.setdefault("metrics", {}).update({k: v for k, v in normalized.items() if v is not None})

            if isinstance(estimates_raw, list) and estimates_raw:
                estimate = normalize_estimate(choose_annual_estimate(estimates_raw))
                company["estimates"] = {k: v for k, v in estimate.items() if v is not None}

            if isinstance(history_raw, list) and history_raw:
                company["history"] = historical_series(history_raw)

            company["providerSymbol"] = symbol
            company["framework"] = row["framework"]
            company["peerGroup"] = row["peerGroup"]
            company["currency"] = row["currency"]
            compute_derived(company)

        stamp = now_iso()
        live["meta"]["fundamentalsUpdatedAt"] = stamp
        live["meta"]["estimatesUpdatedAt"] = stamp
        live["meta"]["historicalUpdatedAt"] = stamp

        # Save one compact daily consensus snapshot for revision calculations.
        day = dt.datetime.now(UTC).date().isoformat()
        snapshots = history.setdefault("snapshots", [])
        snapshot = {
            "timestamp": stamp,
            "date": day,
            "companies": {
                ticker: {
                    "revenueAvg": company.get("estimates", {}).get("revenueAvg"),
                    "epsAvg": company.get("estimates", {}).get("epsAvg"),
                    "periodEnd": company.get("estimates", {}).get("periodEnd"),
                }
                for ticker, company in live["companies"].items()
                if company.get("estimates")
            },
        }
        snapshots = [s for s in snapshots if s.get("date") != day]
        snapshots.append(snapshot)
        # Keep 400 days, enough for 90-day revision history with buffer.
        cutoff = dt.datetime.now(UTC) - dt.timedelta(days=400)
        history["snapshots"] = [s for s in snapshots if (parse_iso(s.get("timestamp")) or dt.datetime.min.replace(tzinfo=UTC)) >= cutoff]

    # Recompute derived values after every quote update and revision fields after history is available.
    for company in live["companies"].values():
        compute_derived(company)
    update_revision_fields(live, history)

    live["meta"].update({
        "provider": "Financial Modeling Prep",
        "providerUrl": "https://financialmodelingprep.com/",
        "status": "live" if live["meta"].get("quotesUpdatedAt") else "partial",
        "generatedAt": now_iso(),
        "universeCount": len(universe),
        "errorCount": len(fmp.errors),
        "errors": fmp.errors[-20:],
        "note": "Quote freshness and endpoint entitlements depend on the configured FMP subscription. Company-reported research remains separately sourced from issuer materials."
    })

    save_json(LIVE_PATH, live)
    save_json(HISTORY_PATH, history)
    if fmp.errors:
        print("Provider warnings:", file=sys.stderr)
        for error in fmp.errors[-10:]:
            print(f" - {error}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
