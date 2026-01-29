#!/bin/sh
set -euo pipefail

if [ -z "${TYPEORM_HOST:-}" ]; then
  echo "TYPEORM_HOST is not set. Did you provide the .env file?"
fi

echo "[entrypoint] Bootstrapping API (migrations + seed + server)..."
exec node dist/scripts/bootstrap.js
