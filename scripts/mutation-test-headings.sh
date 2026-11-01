#!/usr/bin/env bash
# Mutation test for the heading-localisation checks.
#
# A check script that only ever passes is worthless. This injects known
# defects into the source, confirms the check reports each one by name, and
# restores the file afterwards.
#
# Rules learned the hard way in this repository — the first version of this
# script violated two of them and left the working tree mutated:
#
#   - **Restore must be unconditional.** The first version only restored when
#     the mutation had applied, so a case whose needle did not match left the
#     previous case's mutation in the file. Here the restore runs on every exit
#     path, including `set -e` failures and interrupts.
#   - **Every mutation must confirm it applied.** A `replace` that does not
#     match leaves the source untouched and the check would then pass for the
#     wrong reason, which looks like a green run.
#   - **The build must be rebuilt for defects that only show in the rendered
#     pages**, because the audit reads `out/`.
#   - **The needle must exist in the file as it is now.** The heading values
#     are positional arguments, not `ja:` keys, so a needle written against the
#     wrong shape silently matches nothing.
#
# The script asserts at the end that the working tree is byte-identical to how
# it found it, so a failed restore is reported rather than hidden.
#
# Usage: bash scripts/mutation-test-headings.sh

set -uo pipefail
cd "$(dirname "$0")/.."

HEADINGS_MAP="src/data/comparison-editorial-headings.ts"
BROWSER_SECTIONS="src/data/browser-sections.ts"
EVIDENCE="src/components/product-evidence.tsx"
AUDIT="scripts/audit-heading-localisation.mjs"
CHECK="scripts/check-comparison-headings.mjs"

WORK=$(mktemp -d)
pass=0
fail=0

# Every file the script touches is copied into $WORK first. The trap restores
# all of them, whatever happens.
for file in "$HEADINGS_MAP" "$BROWSER_SECTIONS" "$EVIDENCE"; do
	cp "$file" "$WORK/$(echo "$file" | tr '/' '_')"
done

restore() {
	# The trap fires after the cleanup step removed $WORK, so the copies are
	# skipped once the directory is gone.
	[ -d "$WORK" ] || return 0
	for file in "$HEADINGS_MAP" "$BROWSER_SECTIONS" "$EVIDENCE"; do
		cp "$WORK/$(echo "$file" | tr '/' '_')" "$file"
	done
}
trap restore EXIT INT TERM

# mutate <file> <python-snippet>
# The snippet receives the file path as argv[1] and prints
# "applied: true" or "applied: false".
mutate() {
	python3 -c "$2" "$1"
}

# expect_failure <name> <file> <script> <needle>
expect_failure() {
	local name="$1" file="$2" script="$3" needle="$4"
	local output status
	output=$(node "$script" 2>&1)
	status=$?
	if [ $status -eq 0 ]; then
		echo "  ✗ $name — check still passed (exit 0); the defect was missed"
		echo "$output" | head -6 | sed 's/^/      /'
		fail=$((fail + 1))
		return
	fi
	if ! echo "$output" | grep -qi -- "$needle"; then
		echo "  ✗ $name — check failed but did not name the defect (looked for: $needle)"
		echo "$output" | head -6 | sed 's/^/      /'
		fail=$((fail + 1))
		return
	fi
	echo "  ✓ $name — reported by name"
	pass=$((pass + 1))
}

# require_applied <label>
require_applied() {
	local out
	out=$(python3 -c "$2" "$1")
	echo "  $out"
	if ! echo "$out" | grep -q "applied: true"; then
		echo "  ✗ $3 — mutation did not apply; the case is inconclusive"
		fail=$((fail + 1))
		return 1
	fi
	return 0
}

rebuild() {
	(mv .next /tmp/mt-next-$$ 2>/dev/null || true)
	if env -u NODE_OPTIONS NEXT_TURBO_TMP_DIR=/tmp/bh-turbo NEXT_TURBOPACK_CACHE_DIR=/tmp/bh-turbo-cache npm run build >/tmp/mt-build.log 2>&1; then
		node scripts/fix-static-locale-lang.mjs >/dev/null 2>&1
		return 0
	fi
	return 1
}

echo "Mutation test for the heading checks"
echo

echo "1. A translation is removed from the map"
if require_applied "$HEADINGS_MAP" '
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
needle = "\t\t\"AdsPower と Dolphin Anty：運用するタスクから比較する\",\n"
print("applied: true" if needle in s else "applied: false")
p.write_text(s.replace(needle, "", 1))
' "missing locale value"; then
	expect_failure "missing locale value" "$HEADINGS_MAP" "$CHECK" "is a non-empty string"
fi
restore

echo
echo "2. A translation is replaced by the English string"
if require_applied "$HEADINGS_MAP" '
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
needle = "\t\t\"AdsPower と Dolphin Anty：運用するタスクから比較する\","
repl = "\t\t\"AdsPower vs Dolphin Anty: compare the task you maintain\","
print("applied: true" if needle in s else "applied: false")
p.write_text(s.replace(needle, repl, 1))
' "untranslated copy"; then
	expect_failure "untranslated copy" "$HEADINGS_MAP" "$CHECK" "differs from the English copy"
fi
restore

echo
echo "3. A Chinese string leaks into a translation"
if require_applied "$HEADINGS_MAP" '
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
needle = "\t\t\"Проверьте актуальные варианты движка и прокси, не догадываясь\""
repl = "\t\t\"按当前官方资料核对内核与代理选项\""
print("applied: true" if needle in s else "applied: false")
p.write_text(s.replace(needle, repl, 1))
' "Chinese copy in a translation"; then
	expect_failure "Chinese copy in a translation" "$HEADINGS_MAP" "$CHECK" "carries no Chinese copy"
fi
restore

echo
echo "4. A browser section heading is reverted to English"
if require_applied "$BROWSER_SECTIONS" '
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
needle = "\t\tstorage: \"保存方式がこの製品の前提を決める\","
repl = "\t\tstorage: \"Storage model sets the premise\","
print("applied: true" if needle in s else "applied: false")
p.write_text(s.replace(needle, repl, 1))
' "untranslated browser heading"; then
	echo "  (rebuilding with the mutation)"
	if rebuild; then
		expect_failure "untranslated browser heading" "$BROWSER_SECTIONS" "$AUDIT" "Untranslated headings"
	else
		echo "  ✗ untranslated browser heading — the mutated build failed"
		tail -8 /tmp/mt-build.log | sed 's/^/      /'
		fail=$((fail + 1))
	fi
fi
restore

echo
echo "5. The evidence block renders two identical <h2> on a comparison page"
if require_applied "$EVIDENCE" '
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
needle = "\t\t\t? <h3 className=\"text-base font-semibold\">{heading}</h3>"
repl = "\t\t\t? <h2 className=\"text-base font-semibold\">{text.heading}</h2>"
print("applied: true" if needle in s else "applied: false")
p.write_text(s.replace(needle, repl, 1))
' "duplicate heading on a comparison page"; then
	echo "  (rebuilding with the mutation)"
	if rebuild; then
		expect_failure "duplicate heading on a comparison page" "$EVIDENCE" "$AUDIT" "Duplicate"
	else
		echo "  ✗ duplicate heading on a comparison page — the mutated build failed"
		tail -8 /tmp/mt-build.log | sed 's/^/      /'
		fail=$((fail + 1))
	fi
fi
restore

echo
echo "6. The working tree is unchanged"
if diff -q "$WORK/$(echo "$HEADINGS_MAP" | tr '/' '_')" "$HEADINGS_MAP" >/dev/null \
	&& diff -q "$WORK/$(echo "$BROWSER_SECTIONS" | tr '/' '_')" "$BROWSER_SECTIONS" >/dev/null \
	&& diff -q "$WORK/$(echo "$EVIDENCE" | tr '/' '_')" "$EVIDENCE" >/dev/null; then
	echo "  ✓ all mutated files restored byte-for-byte"
	pass=$((pass + 1))
else
	echo "  ✗ a mutated file was not restored — the working tree is dirty"
	fail=$((fail + 1))
fi

rm -rf "$WORK"
echo
echo "Result: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
