#!/usr/bin/env bash

set -e

source .env

SCRIPT_NAME=brotli

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
  -H "X-Auth-Key: $CF_AUTH_KEY" \
  -H "X-Auth-Email: $CF_AUTH_EMAIL" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "script=@worker.js;type=application/javascript" \
  -F "wasm=@module.wasm;type=application/wasm"
