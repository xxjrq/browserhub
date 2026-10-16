#!/usr/bin/env python3
"""Read only BrowserHub's dedicated nginx logs and emit aggregate JSON.

No IPs, full user agents, full referrers or query strings are emitted or saved.
Requests, URL-shaped HTML candidates and claimed crawler UAs are not users,
organic search clicks, verified crawlers, or proof of search indexing.
"""
import argparse
from collections import Counter
from datetime import datetime, timedelta, timezone
import gzip
import json
from pathlib import Path
import re
from urllib.parse import urlsplit


LINE = re.compile(
    r'^\S+ \S+ \S+ \[([^]]+)\] "([^"]*)" (\d{3}) \S+ "([^"]*)" "([^"]*)"'
)


def referrer_group(value):
    try:
        host = (urlsplit(value).hostname or "").lower()
    except ValueError:
        return "unknown_or_missing"
    if not host:
        return "unknown_or_missing"
    if host in {"browserhub.co", "browsers.draxgr.cc"}:
        return "internal"
    if any(host == domain or host.endswith("." + domain) for domain in
           ("chatgpt.com", "chat.openai.com", "perplexity.ai", "claude.ai",
            "copilot.microsoft.com", "gemini.google.com")):
        return "ai_referrer"
    if (re.search(r"(^|\.)google\.[a-z.]+$", host)
        or any(host == domain or host.endswith("." + domain) for domain in
               ("bing.com", "baidu.com", "duckduckgo.com", "search.yahoo.com",
                "yandex.com", "yandex.ru", "sogou.com", "so.com"))):
        return "search_engine_referrer"
    return "other_external"


def ua_group(value):
    agent = value.lower()
    if "browserhub-measurement-check" in agent or "browserhub-audit" in agent:
        return "our_measurement_probe"
    if "googlebot" in agent:
        return "claims_googlebot_unverified"
    if "bingbot" in agent:
        return "claims_bingbot_unverified"
    if any(token in agent for token in ("oai-searchbot", "chatgpt-user", "gptbot",
                                        "claudebot", "claude-user", "perplexitybot")):
        return "claims_ai_crawler_unverified"
    if any(token in agent for token in ("bot", "spider", "crawler", "slurp")):
        return "other_claimed_crawler_unverified"
    if any(token in agent for token in ("curl/", "python-urllib", "wget/")):
        return "command_line_client"
    return "other_or_browser_unverified"


def summarize():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", required=True, choices=("browserhub.co", "browsers.draxgr.cc"))
    parser.add_argument("--log-dir", default="/var/log/nginx")
    parser.add_argument("--days", nargs="+", type=int, default=[7, 28])
    parser.add_argument("--now", help="Optional ISO-8601 end time for repeatable snapshots")
    args = parser.parse_args()
    if any(day < 1 or day > 366 for day in args.days):
        parser.error("--days must be between 1 and 366")
    now = datetime.fromisoformat(args.now.replace("Z", "+00:00")) if args.now else datetime.now(timezone.utc)
    if now.tzinfo is None:
        parser.error("--now must include a timezone")
    now = now.astimezone(timezone.utc)
    windows = {day: {"requests": 0, "status_groups": Counter(), "get_2xx_html_path_candidates": 0,
                     "referrer_groups": Counter(), "ua_groups": Counter(), "requests_by_utc_day": Counter()}
               for day in args.days}
    files = sorted(Path(args.log_dir).glob(args.site + ".access.log*"))
    earliest = None
    latest = None
    invalid = 0
    parsed = 0
    for file in files:
        if not file.is_file():
            continue
        opener = gzip.open if file.suffix == ".gz" else open
        with opener(file, "rt", encoding="utf-8", errors="replace") as stream:
            for line in stream:
                match = LINE.match(line)
                if not match:
                    invalid += 1
                    continue
                stamp, request, status, referrer, agent = match.groups()
                try:
                    moment = datetime.strptime(stamp, "%d/%b/%Y:%H:%M:%S %z").astimezone(timezone.utc)
                except ValueError:
                    invalid += 1
                    continue
                parsed += 1
                earliest = min(earliest, moment) if earliest else moment
                latest = max(latest, moment) if latest else moment
                parts = request.split(" ", 2)
                method = parts[0]
                try:
                    pathname = urlsplit(parts[1]).path if len(parts) > 1 else ""
                except ValueError:
                    pathname = ""
                html_candidate = bool(pathname) and (pathname.endswith("/")
                    or pathname.endswith(".html") or "." not in pathname.rsplit("/", 1)[-1])
                for day, count in windows.items():
                    if not now - timedelta(days=day) <= moment <= now:
                        continue
                    count["requests"] += 1
                    count["status_groups"][status[0] + "xx"] += 1
                    count["get_2xx_html_path_candidates"] += int(method == "GET" and status.startswith("2") and html_candidate)
                    count["referrer_groups"][referrer_group(referrer)] += 1
                    count["ua_groups"][ua_group(agent)] += 1
                    count["requests_by_utc_day"][moment.date().isoformat()] += 1
    output = {
        "site": args.site,
        "generated_at_utc": now.isoformat(),
        "dedicated_log_files": len(files),
        "parsed_records": parsed,
        "unparsed_records": invalid,
        "earliest_record_utc": earliest.isoformat() if earliest else None,
        "latest_record_utc": latest.isoformat() if latest else None,
        "windows": {str(day): {"from_utc": (now - timedelta(days=day)).isoformat(), **count}
                    for day, count in windows.items()},
        "interpretation": [
            "Counts apply only to this dedicated vhost log; HTTP and HTTPS are combined.",
            "Requested lookback windows can exceed log retention or measurement lifetime; absent historical data is unknown.",
            "HTML candidates are based on URL path and GET/2xx, without a recorded Content-Type.",
            "Referrers can be absent, forged or suppressed; requests include diagnostics, redirects and bots.",
            "Crawler categories are self-reported user agents, not verified robot identities.",
            "No output metric is a user count, organic search click count, conversion count or indexing count.",
            "Cloudflare cache hits may not reach the origin; origin logs can undercount public-domain requests.",
        ],
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    summarize()
