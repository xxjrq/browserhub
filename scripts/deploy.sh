#!/usr/bin/env bash
# Build BrowserHub and publish the static export to the production Nginx host.
#
# Flow: clean cache -> npm run ci -> rsync out/ to a timestamped release dir ->
# atomically repoint /opt/browsertools/current -> reload Nginx -> smoke-test.
# A failed build or failed health check leaves the previous release serving traffic.
#
# Deploy host (confirmed 2026-10-15): the release notes in deploy/nginx/*.conf
# point browsers.draxgr.cc and browserhub.co at the same origin, root@178.156.220.215
# (hostname mz1), which serves /opt/browsertools. It is NOT one of the hosts in
# ~/.ssh/config that also run unrelated business sites, which is why a blind search
# over those hosts finds nothing. Use the `browserhub-deploy` ssh alias, added to
# ~/.ssh/config for this reason.
#
# Usage: DEPLOY_HOST=browserhub-deploy DOMAIN=browsers.draxgr.cc bash scripts/deploy.sh
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/Users/myd/develop/brower/easybrmy/browsertools}"
DEPLOY_HOST="${DEPLOY_HOST:-browserhub-deploy}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/opt/browsertools}"
RELEASES="$DEPLOY_ROOT/releases"
CURRENT="$DEPLOY_ROOT/current"
# Default to the origin host, not browserhub.co: browserhub.co sits behind
# Cloudflare, so its smoke test can pass against a cached copy and report a
# stale deploy as healthy. browsers.draxgr.cc reads this box directly.
DOMAIN="${DOMAIN:-browsers.draxgr.cc}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
export NEXT_PUBLIC_SITE_URL="https://$DOMAIN"
# WorkBuddy injects NODE_OPTIONS with a sandbox shim that redirects Node sockets to a
# broker socket that rejects connections; clearing it is required for `next build`.
unset NODE_OPTIONS

log() { printf '\n\033[1;34m[deploy]\033[0m %s\n' "$*"; }

log "1/6 cleaning build cache"
cd "$PROJECT_DIR"
[ -d .next ] && mv .next "/tmp/browserhub-next-$(date +%s)"
[ -d out ] && mv out "/tmp/browserhub-out-$(date +%s)"
mkdir -p .next out

log "2/6 building static export"
export NEXT_TURBO_TMP_DIR=/tmp/browserhub-turbo
export NEXT_TURBOPACK_CACHE_DIR=/tmp/browserhub-turbo-cache
npm run ci

[ -f out/index.html ] || { echo "BUILD FAILED: out/index.html missing"; exit 1; }
PAGE_COUNT=$(find out -name 'index.html' | wc -l | tr -d ' ')
log "build produced $PAGE_COUNT pages"

log "3/6 creating release directory on $DEPLOY_HOST"
STAMP=$(date +%Y%m%d-%H%M%S)
RELEASE="$RELEASES/$STAMP"
ssh "$DEPLOY_HOST" "mkdir -p '$RELEASE'"

log "4/6 uploading out/ (this takes a minute)"
rsync -az --delete \
  --exclude '.DS_Store' \
  -e "ssh -o BatchMode=yes" \
  out/ "$DEPLOY_HOST:$RELEASE/"

log "5/6 switching current -> $STAMP"
ssh "$DEPLOY_HOST" "ln -sfn '$RELEASE' '$CURRENT' && nginx -t 2>&1 | tail -2 && systemctl reload nginx 2>/dev/null || nginx -s reload"

log "pruning old releases (keeping $KEEP_RELEASES)"
ssh "$DEPLOY_HOST" "ls -1dt '$RELEASES'/*/ 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf"

log "6/6 smoke test"
sleep 2
CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMAIN/")
CANON=$(curl -sL --max-time 20 "https://$DOMAIN/zh-cn/browsers/easybr/" | grep -o '相关资源' | head -1 || true)
echo "  https://$DOMAIN/ -> HTTP $CODE"
echo "  release path: $RELEASE"

if [ "$CODE" != "200" ]; then
  echo "SMOKE TEST FAILED (HTTP $CODE). Previous release may still be cached by Cloudflare."
  exit 1
fi
log "deploy complete"