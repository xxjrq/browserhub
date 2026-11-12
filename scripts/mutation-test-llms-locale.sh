#!/usr/bin/env bash
# Mutation test for the per-locale knowledge files.
#
# A validation script that only ever passes is worthless. This harness injects
# a defect into a COPY of the source tree, renders the knowledge files from
# that copy, and asserts that the checker reports the defect BY NAME.
#
# The copy is the point: the mutations never touch the working tree, so a
# failed run cannot leave a mutated source behind. The run also asserts at
# the end that the working tree is byte-identical to how it started.
#
# Usage: bash scripts/mutation-test-llms-locale.sh
#
# Mutations:
#   1. Chinese copy leaks into an English description -> "no Chinese copy leaked"
#   2. The review date is dropped from a browser line  -> "prints the review date"
#   3. The price status is flipped                    -> "states the reviewed price status"
#   4. A page description drifts from the page        -> "matches the page's meta description"
#   5. A catalogue link is dropped                    -> "every sitemap URL of this locale is linked"
#   6. A link points at another locale's page         -> "links no page of another locale"
#   7. A language file is dropped from the root file  -> "links one knowledge file per locale"

set -uo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
WORK="$(mktemp -d -t llms-locale-mutation)"

cleanup() {
	rm -rf "$WORK"
}
trap cleanup EXIT

PASS=0
FAIL=0

# A fingerprint of the working tree, taken before any mutation runs. The
# mutations are applied to a copy, so this must be identical at the end. The
# assertion is against this snapshot rather than against HEAD, because the
# tree legitimately holds uncommitted work while this runs.
tree_fingerprint() {
	find "$ROOT/src" "$ROOT/scripts" -type f \
		-exec shasum {} \; \
		| sed "s|$ROOT/||" \
		| sort \
		| shasum \
		| cut -d' ' -f1
}

FINGERPRINT_BEFORE="$(tree_fingerprint)"

# Rebuild the mutated source tree from the pristine working tree.
reset_tree() {
	rm -rf "$WORK/src"
	cp -R "$ROOT/src" "$WORK/src"
}

# Apply a replacement to a file inside the mutated tree.
apply() {
	local relative="$1"
	local pattern="$2"
	local replacement="$3"
	python3 - "$WORK/src/$relative" "$pattern" "$replacement" <<'PY'
import sys
path, pattern, replacement = sys.argv[1], sys.argv[2], sys.argv[3]
with open(path, encoding="utf8") as fh:
    text = fh.read()
if pattern not in text:
    sys.exit(3)
with open(path, "w", encoding="utf8") as fh:
    fh.write(text.replace(pattern, replacement, 1))
PY
}

run_mutation() {
	local name="$1"
	local expect="$2"
	local relative="$3"
	local pattern="$4"
	local replacement="$5"

	echo "=== mutation: $name ==="
	reset_tree

	if ! grep -qF -- "$pattern" "$ROOT/src/$relative"; then
		echo "  applied: false — pattern not found in src/$relative"
		echo "  RESULT: FAIL (the mutation never applied, so the test proves nothing)"
		FAIL=$((FAIL + 1))
		echo
		return
	fi

	if ! apply "$relative" "$pattern" "$replacement"; then
		echo "  applied: false — the replacement could not be applied"
		echo "  RESULT: FAIL (the mutation never applied, so the test proves nothing)"
		FAIL=$((FAIL + 1))
		echo
		return
	fi
	echo "  applied: true"

	local output
	output="$(node scripts/check-llms-txt.mjs --src "$WORK" --out out 2>&1)"

	if echo "$output" | grep -qF -- "$expect"; then
		echo "  RESULT: PASS — reported \"$expect\""
		PASS=$((PASS + 1))
	else
		echo "  RESULT: FAIL — expected \"$expect\" was not reported"
		echo "$output" | head -12 | sed 's/^/    /'
		FAIL=$((FAIL + 1))
	fi
	echo
}

LOCALE_ROUTE="app/[locale]/llms.txt/route.ts"
ROOT_ROUTE="app/llms.txt/route.ts"
LOCALE_COPY="data/llms-locale-copy.ts"

# 1. Chinese copy in a non-Chinese file. The Japanese file's own scope is
#    Japanese; swapping it for the Chinese scope sentence must be caught by
#    the zh-cn source-string needles.
run_mutation \
	"Chinese copy leaks into the Japanese file" \
	"no Chinese copy leaked into the file" \
	"$LOCALE_COPY" \
	'scope: "このファイルは BrowserHub の日本語ページ' \
	'scope: "本文件覆盖 BrowserHub 的中文页面，即 /zh-cn/ 路径下的全部内容：反检测浏览器、检测与自动化工具、浏览器指纹信号、浏览器横向对比，以及关于、联系与隐私说明。站点总览见 https://browserhub.co/llms.txt 。", scopeEn: "This file covers the Japanese pages'

# 2. The review date is dropped from a browser line. A price without the date
#    it was read on is the one thing this file must never contain.
run_mutation \
	"review date dropped from a browser line" \
	"prints the review date" \
	"$LOCALE_ROUTE" \
	'${text.reviewed} ${evidence.verifiedAt}' \
	'${text.reviewed}'

# 3. The price status is inverted: a product whose price was verified is
#    written up as unverified, and the wording of the other status is used.
run_mutation \
	"price status inverted" \
	"states the reviewed price status" \
	"$LOCALE_ROUTE" \
	'const pricing = evidence.pricingStatus === "verified" ? text.priceConfirmed : text.priceUnverified;' \
	'const pricing = evidence.pricingStatus === "unverified" ? text.priceConfirmed : text.priceUnverified;'

# 4. A page description drifts from the description the page itself renders.
run_mutation \
	"page description drifts" \
	"matches the page's meta description" \
	"$LOCALE_ROUTE" \
	'return `- [${tool.name}](${link(locale, `tools/${tool.slug}`)}) — ${localizedResourceDescription(locale, "tools", tool)}`;' \
	'return `- [${tool.name}](${link(locale, `tools/${tool.slug}`)}) — A generic description that no longer matches the page.`;'

# 5. A catalogue link is dropped, so a page of that language is no longer
#    reachable from its own knowledge file.
run_mutation \
	"a catalogue link is dropped" \
	"every sitemap URL of this locale is linked" \
	"$LOCALE_ROUTE" \
	'${tools.map(tool => toolEntry(locale, tool)).join("\n")}' \
	'${tools.slice(0, 10).map(tool => toolEntry(locale, tool)).join("\n")}'

# 6. A link points at another locale's page. A Japanese knowledge file must
#    not send the reader to a Korean page.
run_mutation \
	"a link points at another locale" \
	"links no page of another locale" \
	"$LOCALE_ROUTE" \
	'return `- [${technology.name}](${link(locale, `fingerprint/${technology.slug}`)}) — ${localizedResourceDescription(locale, "fingerprint", technology)}`;' \
	'return `- [${technology.name}](${SITE}/ko/fingerprint/${technology.slug}) — ${localizedResourceDescription(locale, "fingerprint", technology)}`;'

# 7. A language file is dropped from the root file, so an agent reading only
#    the root file can no longer reach that language.
run_mutation \
	"a language file is dropped from the root file" \
	"links one knowledge file per locale" \
	"$ROOT_ROUTE" \
	'.map(locale => `- [${localeMeta[locale].label}](${SITE}${localePath(locale)}llms.txt) — ${llmsLocaleCopy[locale].scope}`)' \
	'.filter(locale => locale !== "ru").map(locale => `- [${localeMeta[locale].label}](${SITE}${localePath(locale)}llms.txt) — ${llmsLocaleCopy[locale].scope}`)'

# The working tree must be byte-identical to how it started. The mutations
# ran against a copy, so this must hold; the assertion is here so that a
# future change to the harness cannot silently start editing real sources.
FINGERPRINT_AFTER="$(tree_fingerprint)"
if [ "$FINGERPRINT_BEFORE" != "$FINGERPRINT_AFTER" ]; then
	echo "RESULT: FAIL — the working tree changed during the mutation run."
	echo "  before: $FINGERPRINT_BEFORE"
	echo "  after:  $FINGERPRINT_AFTER"
	FAIL=$((FAIL + 1))
else
	echo "working tree unchanged: $FINGERPRINT_AFTER"
fi

echo "=== mutation summary: $PASS passed, $FAIL failed ==="
[ "$FAIL" -eq 0 ]
