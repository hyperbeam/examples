#!/usr/bin/env bash

# curl that spins up a virtual browser with extension.zip loaded
# see https://docs.hyperbeam.com/install-chrome-extension
curl -X POST \
  -H "Authorization: Bearer $HB_API_KEY" \
  -H 'Content-Type: multipart/form-data' \
  https://engine.hyperbeam.com/v0/vm \
  --form 'body={"ublock":true,"timeout":{"offline": 60},"extension":{"field":"ex"}}' \
  --form "ex=@$(pwd)/extension.zip;type=application/zip"
