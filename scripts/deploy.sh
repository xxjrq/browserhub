#!/usr/bin/env bash
# Build and atomically publish BrowserHub; failed health checks restore prior release.
set -euo pipefail
PROJECT_DIR="${PROJECT_DIR:-/Users/myd/develop/brower/easybrmy/browsertools}"
DEPLOY_HOST="${DEPLOY_HOST:-browserhub-deploy}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/opt/browsertools}"
DOMAIN="${DOMAIN:-browsers.draxgr.cc}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
cd "$PROJECT_DIR"
unset NODE_OPTIONS
export NEXT_PUBLIC_SITE_URL=https://browserhub.co
if [ "${SKIP_BUILD:-0}" != 1 ]; then
  npm run ci
else
  npm run check:dist
  npm run audit:seo
fi
STAMP=$(date +%Y%m%d-%H%M%S)
RELEASE="$DEPLOY_ROOT/releases/$STAMP"
CURRENT="$DEPLOY_ROOT/current"
PREVIOUS=$(ssh -o BatchMode=yes "$DEPLOY_HOST" "readlink -f '$CURRENT'")
SWITCHED=0
rollback() {
  if [ "$SWITCHED" = 1 ] && [ -n "$PREVIOUS" ]; then
    ssh "$DEPLOY_HOST" "ln -sfn '$PREVIOUS' '$CURRENT' && nginx -t && systemctl reload nginx" || true
    echo 'Health check failed; restored the prior release.' >&2
  fi
}
trap rollback ERR
ssh "$DEPLOY_HOST" "mkdir -p '$RELEASE'"
rsync -az --delete --exclude '.DS_Store' -e "ssh -o BatchMode=yes" out/ "$DEPLOY_HOST:$RELEASE/"
ssh "$DEPLOY_HOST" "test -f '$RELEASE/en/guides/best-antidetect-browsers-2026/index.html' && test -f '$RELEASE/sitemap.xml' && nginx -t"
SWITCHED=1
ssh "$DEPLOY_HOST" "ln -sfn '$RELEASE' '$CURRENT' && systemctl reload nginx"
# Origin verification proves this release is serving, independently of CDN caches.
curl -fsS --retry 2 --max-time 25 "https://$DOMAIN/en/guides/best-antidetect-browsers-2026/" -o /tmp/browserhub-deploy-health.html
node -e 'const s=require("fs").readFileSync("/tmp/browserhub-deploy-health.html","utf8"); if(!s.includes("best-antidetect-browsers-2026") || !s.includes("id=\"sources\"") || !s.includes("https://browserhub.co/en/guides/best-antidetect-browsers-2026/")) process.exit(1)'
curl -fsS --max-time 25 "https://$DOMAIN/sitemap.xml" -o /tmp/browserhub-deploy-sitemap.xml
cmp out/sitemap.xml /tmp/browserhub-deploy-sitemap.xml
trap - ERR
SWITCHED=0
ssh "$DEPLOY_HOST" "ls -1dt '$DEPLOY_ROOT/releases'/*/ | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf"
echo "Published: $RELEASE"
