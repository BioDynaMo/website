#!/bin/bash

SCRIPT_PATH=$($READLINK -e $(dirname "${BASH_SOURCE[0]}"))

cd "$SCRIPT_PATH"

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing generated API files
rm -rf ${SCRIPT_PATH}/static/api
