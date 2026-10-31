import fs from "node:fs";
import path from "node:path";

const root = "out";
const sm = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [
  ...sm.matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => m[1].replace(/^https:\/\/[^/]+/, ""));

const LOCALES = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];
const NON_CJK = ["en", "es", "pt"]; // ja/ko legitimately contain kanji

function articleOf(html) {
  const m = html.match(/<article[\s\S]*?<\/article>/i);
  return m ? m[0] : "";
}
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}
function fileOf(u) {
  const clean = u.replace(/^\//, "").replace(/\/$/, "");
  return clean ? path.join(root, clean, "index.html") : path.join(root, "index.html");
}

// Chinese source strings harvested from zh-cn pages (longest CJK runs)
const zhRuns = new Set();
for (const u of urls) {
  if (!u.startsWith("/zh-cn/")) continue;
  const f = fileOf(u);
  if (!fs.existsSync(f)) continue;
  const t = visibleText(articleOf(fs.readFileSync(f, "utf8")));
  for (const m of t.matchAll(/[\u4e00-\u9fff][\u4e00-\u9fff\u3000-\u303f\uff00-\uffef，。、；：？！“”‘’（）《》·—…]{5,}/g)) {
    zhRuns.add(m[0]);
  }
}
const zhList = [...zhRuns].filter((s) => s.length >= 8).sort((a, b) => b.length - a.length);
console.log(`harvested ${zhList.length} zh-cn source strings (len>=8)`);

console.log("\n=== zh-cn substring leakage in non-zh locales (<article> visible text) ===");
const leaks = {};
for (const u of urls) {
  const loc = u.match(/^\/([a-z]{2}(?:-[a-z]{2})?)/)?.[1];
  if (!loc || loc === "zh-cn") continue;
  const f = fileOf(u);
  if (!fs.existsSync(f)) continue;
  const art = articleOf(fs.readFileSync(f, "utf8"));
  if (!art) continue;
  const t = visibleText(art);
  const hits = zhList.filter((s) => t.includes(s));
  if (hits.length) {
    leaks[u] = hits;
  }
}
const leakEntries = Object.entries(leaks);
console.log(`leaking pages: ${leakEntries.length}`);
leakEntries.slice(0, 25).forEach(([u, hits]) => {
  console.log(`  ${u}`);
  hits.slice(0, 3).forEach((h) => console.log(`      "${h.slice(0, 70)}"`));
});

// CJK count in pure-Latin locales (en/es/pt) - any CJK is a defect
console.log("\n=== CJK char count in en/es/pt pages (<article>) ===");
let cjkTotal = 0;
const cjkPages = [];
for (const u of urls) {
  const loc = u.match(/^\/([a-z]{2}(?:-[a-z]{2})?)/)?.[1];
  if (!NON_CJK.includes(loc)) continue;
  const f = fileOf(u);
  if (!fs.existsSync(f)) continue;
  const art = articleOf(fs.readFileSync(f, "utf8"));
  if (!art) continue;
  const cjk = (visibleText(art).match(/[\u4e00-\u9fff]/g) || []).length;
  if (cjk > 0) {
    cjkTotal += cjk;
    cjkPages.push([u, cjk]);
  }
}
console.log(`pages with CJK: ${cjkPages.length}, total CJK chars: ${cjkTotal}`);
cjkPages.sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([u, c]) => console.log(`  ${c}  ${u}`));

// lang attribute check
console.log("\n=== html lang attribute vs locale ===");
const langBad = [];
for (const u of urls) {
  const loc = u.match(/^\/([a-z]{2}(?:-[a-z]{2})?)/)?.[1];
  const f = fileOf(u);
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, "utf8");
  const m = h.match(/<html[^>]*\slang="([^"]*)"/);
  const got = m ? m[1] : "(none)";
  const expect = loc || "en";
  if (got !== expect) langBad.push(`${u} -> ${got} (expect ${expect})`);
}
console.log(`mismatched: ${langBad.length}`);
langBad.slice(0, 10).forEach((s) => console.log("  " + s));
