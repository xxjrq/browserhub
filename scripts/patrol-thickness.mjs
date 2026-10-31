import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "out";
const sm = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [
  ...sm.matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => m[1].replace(/^https:\/\/[^/]+/, ""));

const LOCALES = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];

function typeOf(rest) {
  if (rest === "" || rest === "/") return "home";
  const seg = rest.replace(/^\//, "").split("/");
  const first = seg[0];
  if (["guides", "compare", "browsers", "tools", "fingerprint"].includes(first)) {
    // index page = /<prefix>/  (trailing empty segment); detail = /<prefix>/<slug>/
    const isIndex = seg.length < 2 || seg[1] === "";
    return isIndex ? first + "-idx" : first;
  }
  return first;
}

function htmlPath(u) {
  const clean = u.replace(/^\//, "").replace(/\/$/, "");
  if (clean === "") return path.join(root, "index.html");
  return path.join(root, clean, "index.html");
}

function articleOf(html) {
  const m = html.match(/<article[\s\S]*?<\/article>/i);
  return m ? m[0] : "";
}

function textLen(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim().length;
}

const rows = [];
for (const u of urls) {
  const m = u.match(/^\/([a-z]{2}(?:-[a-z]{2})?)(?:\/(.*))?$/);
  const locale = m ? m[1] : "none";
  const rest = m ? m[2] || "" : u;
  const type = typeOf(rest);
  const file = htmlPath(u);
  if (!fs.existsSync(file)) {
    rows.push({ u, locale, type, missing: true });
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const art = articleOf(html);
  rows.push({
    u,
    locale,
    type,
    h2: (art.match(/<h2/g) || []).length,
    h2All: (html.match(/<h2/g) || []).length,
    chars: textLen(art),
    cjk: (art.match(/[\u4e00-\u9fff]/g) || []).length,
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "",
  });
}

const missing = rows.filter((r) => r.missing);
if (missing.length) {
  console.log(`MISSING FILES: ${missing.length}`);
  missing.slice(0, 10).forEach((r) => console.log("  " + r.u));
  console.log("");
}

// aggregate by type
const byType = {};
for (const r of rows) {
  if (r.missing) continue;
  byType[r.type] = byType[r.type] || [];
  byType[r.type].push(r);
}
console.log("=== by page type (sitemap URLs only) ===");
console.log(
  ["type", "n", "avgH2", "minH2", "avgChars", "minChars"].join("\t"),
);
const sorted = Object.entries(byType).sort(
  (a, b) => avg(b[1], "chars") - avg(a[1], "chars"),
);
for (const [t, list] of sorted) {
  console.log(
    [
      t,
      list.length,
      avg(list, "h2").toFixed(2),
      Math.min(...list.map((r) => r.h2)),
      Math.round(avg(list, "chars")),
      Math.min(...list.map((r) => r.chars)),
    ].join("\t"),
  );
}

function avg(list, k) {
  return list.reduce((s, r) => s + r[k], 0) / list.length;
}

console.log("\n=== by locale x type (h2) ===");
const byLT = {};
for (const r of rows) {
  if (r.missing) continue;
  byLT[r.locale] = byLT[r.locale] || {};
  byLT[r.locale][r.type] = byLT[r.locale][r.type] || [];
  byLT[r.locale][r.type].push(r);
}
for (const loc of LOCALES) {
  if (!byLT[loc]) continue;
  const parts = Object.entries(byLT[loc])
    .map(([t, l]) => `${t}=${avg(l, "h2").toFixed(1)}`)
    .sort();
  console.log(`${loc}: ${parts.join("  ")}`);
}

console.log("\n=== thinnest 25 pages (h2 asc, then chars asc) ===");
rows
  .filter((r) => !r.missing)
  .sort((a, b) => a.h2 - b.h2 || a.chars - b.chars)
  .slice(0, 25)
  .forEach((r) =>
    console.log(`${String(r.h2).padStart(2)} h2  ${String(r.chars).padStart(6)} ch  ${r.u}`),
  );

console.log("\n=== CJK leakage in English pages (<article>) ===");
const cjkEn = rows.filter((r) => !r.missing && r.locale === "en" && r.cjk > 0);
console.log(`count: ${cjkEn.length}`);
cjkEn.slice(0, 15).forEach((r) => console.log(`  ${r.cjk} cjk  ${r.u}`));

console.log("\n=== duplicate titles ===");
const tmap = {};
for (const r of rows) {
  if (r.missing || !r.title) continue;
  tmap[r.title] = tmap[r.title] || [];
  tmap[r.title].push(r.u);
}
const dups = Object.entries(tmap).filter(([, v]) => v.length > 1);
console.log(`duplicate title groups: ${dups.length}`);
dups.slice(0, 10).forEach(([t, v]) =>
  console.log(`  "${t}" x${v.length}  e.g. ${v[0]}`),
);
