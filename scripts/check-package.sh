#!/usr/bin/env bash
set -euo pipefail

sdk_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$sdk_dir"
smoke_dir=$(mktemp -d)
trap 'rm -rf "$smoke_dir"' EXIT
consumer_dir="$smoke_dir/consumer"

npm pack --ignore-scripts --pack-destination "$smoke_dir" --quiet
mkdir "$consumer_dir"
printf '{"private":true}\n' > "$consumer_dir/package.json"
npm install --prefix "$consumer_dir" --no-audit --no-fund "$smoke_dir"/*.tgz

cp scripts/package-smoke/consumer.ts "$consumer_dir/consumer.cts"
cp scripts/package-smoke/consumer.ts "$consumer_dir/consumer.mts"
cp scripts/package-smoke/tsconfig.json "$consumer_dir/tsconfig.json"
npm exec -- tsc --project "$consumer_dir/tsconfig.json" --typeRoots "$sdk_dir/node_modules/@types"

node "$consumer_dir/out/consumer.cjs"
node "$consumer_dir/out/consumer.mjs"
