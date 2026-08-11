import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const locales = { "zh-cn": "zh-CN", en: "en", ja: "ja", ko: "ko", es: "es", pt: "pt", ru: "ru" };

for (const [locale, lang] of Object.entries(locales)) {
	const directory = path.join(root, locale);
	if (!fs.existsSync(directory)) continue;
	const files = [];
	const walk = current => {
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const file = path.join(current, entry.name);
			if (entry.isDirectory()) walk(file);
			else if (entry.name.endsWith(".html")) files.push(file);
		}
	};
	walk(directory);
	for (const file of files) {
		const html = fs.readFileSync(file, "utf8");
		fs.writeFileSync(file, html.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`));
	}
}

console.log("Fixed static locale html lang attributes");
