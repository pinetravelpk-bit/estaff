#!/usr/bin/env bash
# Installs a systemd timer on the estaff.pk server that runs the publishing queue every 10 minutes:
# job alert emails, page refresh and IndexNow for queued jobs whose release time has come.
# Run from your computer:  ssh inventiveclicks-vps 'bash -s' < scripts/server/install-queue-timer.sh
set -euo pipefail
cat > /etc/systemd/system/estaff-queue.service <<'EOF'
[Unit]
Description=estaff.pk: release queued jobs (alerts, page refresh, IndexNow)
After=estaff.service

[Service]
Type=oneshot
ExecStart=/usr/bin/curl -fsS --max-time 60 http://127.0.0.1:3115/api/cron/publish
EOF
cat > /etc/systemd/system/estaff-queue.timer <<'EOF'
[Unit]
Description=Run the estaff.pk publishing queue every 10 minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=10min
AccuracySec=30s

[Install]
WantedBy=timers.target
EOF
systemctl daemon-reload
systemctl enable --now estaff-queue.timer
systemctl start estaff-queue.service
echo "Installed. Next runs:"; systemctl list-timers estaff-queue.timer --no-pager | head -3
# To remove: systemctl disable --now estaff-queue.timer && rm /etc/systemd/system/estaff-queue.{service,timer} && systemctl daemon-reload
