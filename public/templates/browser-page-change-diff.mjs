#!/usr/bin/env node
// A small, deterministic text-diff example. It does not fetch or monitor sites.
// Requires Node.js 22+ and no third-party packages.

import assert from "node:assert/strict";

const baseline = `Product plan
Price: $29/month
Availability: In stock
Checked at: 2026-10-29T09:00:00Z
Page views: 1042`;

const current = `Product plan
Price: $25/month
Availability: In stock
Checked at: 2026-10-30T09:00:00Z
Page views: 1088`;

// Ignore only the two known synthetic noise lines in this fixture.
const ignoredLinePatterns = [/^Checked at: /, /^Page views: /];

function normalizedLines(input) {
  return input
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => !ignoredLinePatterns.some(pattern => pattern.test(line)));
}

function compareLines(before, after) {
  const oldLines = normalizedLines(before);
  const newLines = normalizedLines(after);
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);
  return {
    removed: oldLines.filter(line => !newSet.has(line)),
    added: newLines.filter(line => !oldSet.has(line)),
  };
}

const result = compareLines(baseline, current);
assert.deepEqual(result, {
  removed: ["Price: $29/month"],
  added: ["Price: $25/month"],
});

console.log(JSON.stringify({
  result: "synthetic_page_text_diff_passed",
  meaningfulChange: result.removed.length > 0 || result.added.length > 0,
  changes: result,
  ignoredLinePatterns: ignoredLinePatterns.map(pattern => pattern.source),
  baselinePersistedOrReplaced: false,
  pageFetched: false,
  alertSent: false,
  realSiteTested: false,
}, null, 2));
