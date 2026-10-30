#!/usr/bin/env bash
set -euo pipefail

if ! command -v lychee > /dev/null 2>&1; then
  echo "Install Lychee to run npm run check-links." >&2
  echo "Installation guide: https://github.com/lycheeverse/lychee#installation" >&2
  exit 1
fi

git ls-files -z '*.md' | xargs -0 lychee --no-progress --include-fragments=anchor-only
