#!/bin/sh

# cd to packages/api
cd packages/api
echo "API_TOKEN=$(clasp run getToken | sed 's/Running in dev mode.//; s/^ *//; s/ *$//' | tr -d '\n')" > ../../.env.local
cd ../..
echo "token saved to .env.local" 