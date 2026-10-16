import fs from 'node:fs';
import path from 'node:path';
const host = 'browserhub.co';
const key = fs.readFileSync('public/indexnow-key.txt', 'utf8').trim();
const file = process.argv.find(arg => arg.startsWith('--urls='))?.slice(7);
if (!file) throw new Error('Supply --urls=path-to-json-array-of-changed-canonical-urls. Default is dry run; --submit sends.');
const input = JSON.parse(fs.readFileSync(file, 'utf8'));
const urlList = [...new Set(input)];
if (!urlList.length || urlList.length > 10000) throw new Error('Expected 1–10000 changed URLs');
for (const url of urlList) {
 const parsed = new URL(url);
 if (parsed.origin !== `https://${host}` || parsed.search || parsed.hash) throw new Error(`Invalid canonical URL: ${url}`);
 const html = fs.readFileSync(path.join('out', parsed.pathname, 'index.html'), 'utf8');
 if (!html.includes(`rel="canonical" href="${url}"`) || /name="robots" content="[^"]*noindex/.test(html)) throw new Error(`Not indexable/self-canonical: ${url}`);
}
console.log(`IndexNow ${process.argv.includes('--submit') ? 'submission' : 'dry run'}: ${urlList.length} changed URLs`);
if (process.argv.includes('--submit')) {
 const keyLocation = `https://${host}/indexnow-key.txt`;
 const response = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
 if (!response.ok || (await response.text()).trim() !== key) throw new Error('Live ownership key does not match');
 const result = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }), signal: AbortSignal.timeout(30000)
 });
 const report = { timestamp: new Date().toISOString(), status: result.status, urlCount: urlList.length, urlList, message: await result.text() };
 fs.mkdirSync('.runlogs', { recursive: true });
 fs.writeFileSync('.runlogs/indexnow-result.json', JSON.stringify(report, null, 2));
 console.log(`HTTP ${result.status}: ${result.status === 200 ? 'received' : result.status === 202 ? 'received, key validation pending' : 'not accepted'}; this is not an indexing confirmation.`);
 if (![200, 202].includes(result.status)) process.exitCode = 1;
}
