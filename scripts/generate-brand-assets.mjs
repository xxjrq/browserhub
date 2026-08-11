import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const markPath = path.join(root, "public/brand/browserhub-mark.svg");
const mark = await fs.readFile(markPath, "utf8");
const outputDir = path.join(root, "public/brand");
const iconDir = path.join(root, "public/icons");
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(iconDir, { recursive: true });

await sharp(Buffer.from(mark)).resize(512, 512).png().toFile(path.join(outputDir, "browserhub-mark.png"));
const faviconPng = await sharp(Buffer.from(mark)).resize(256, 256).png().toBuffer();
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(0, 6);
icoHeader.writeUInt8(0, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
await fs.writeFile(path.join(root, "src/app/favicon.ico"), Buffer.concat([icoHeader, faviconPng]));
await sharp(Buffer.from(mark)).resize(192, 192).png().toFile(path.join(iconDir, "icon-192.png"));
await sharp(Buffer.from(mark)).resize(512, 512).png().toFile(path.join(iconDir, "icon-512.png"));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1020"/><stop offset="1" stop-color="#172554"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1030" cy="90" r="240" fill="#06B6D4" opacity=".12"/>
  <circle cx="110" cy="570" r="250" fill="#2563EB" opacity=".12"/>
  <image href="data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}" x="100" y="150" width="180" height="180"/>
  <text x="100" y="410" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="54" font-weight="700">BrowserHub</text>
  <text x="100" y="470" fill="#BAE6FD" font-family="Arial,sans-serif" font-size="30">Fingerprint browser and privacy resources</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(outputDir, "browserhub-og.png"));

console.log("Generated BrowserHub brand assets");
