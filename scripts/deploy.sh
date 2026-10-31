#!/usr/bin/env bash
# Deploy the committed HEAD to estaff.pk (VPS 72.62.193.221, SSH alias "inventiveclicks-vps").
# Usage: bash scripts/deploy.sh
set -euo pipefail
HOST="${DEPLOY_HOST:-inventiveclicks-vps}"
cd "$(dirname "$0")/.."
TMP="$(mktemp -d)"
git archive --format=tar.gz -o "$TMP/estaff-src.tgz" HEAD
scp -q "$TMP/estaff-src.tgz" "$HOST:/tmp/estaff-src.tgz"
ssh "$HOST" 'set -e
REL=/var/www/estaff/releases/$(date +%Y%m%d%H%M%S)
mkdir -p "$REL" && tar -xzf /tmp/estaff-src.tgz -C "$REL"
cp /etc/estaff/estaff.env "$REL/.env.production.local"
chown -R estaff:estaff "$REL"
cd "$REL"
sudo -u estaff -H env HOME=/var/www/estaff npm ci --no-audit --no-fund
sudo -u estaff -H env HOME=/var/www/estaff NODE_ENV=production npm run build
ln -sfn "$REL" /var/www/estaff/current && chown -h estaff:estaff /var/www/estaff/current
systemctl restart estaff
# keep the 3 newest releases
ls -1dt /var/www/estaff/releases/* | tail -n +4 | xargs -r rm -rf --
sleep 3; curl -fsS -o /dev/null -w "estaff.pk local check: %{http_code}\n" http://127.0.0.1:3115/'
echo "Deployed. https://estaff.pk"
