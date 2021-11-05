#!/bin/bash

# Use greadlink on macOS
if [[ $(uname -s) = "Darwin"* ]]; then
  READLINK="greadlink"
else
  READLINK="readlink"
fi

SCRIPT_PATH=$($READLINK -e $(dirname "${BASH_SOURCE[0]}"))

cd "$SCRIPT_PATH"

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing generated API files
rm -rf ${SCRIPT_PATH}/static/api
