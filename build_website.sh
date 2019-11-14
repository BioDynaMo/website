#!/bin/bash

# Parse options (from: https://stackoverflow.com/a/33826763)
while [[ "$#" -gt 0 ]]; do case $1 in
  -a|--api) API=1;;
  -s|--serve) SERVE=1;;
  -d|--dir) BDM_DIR="$2"; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

RED='\033[0;31m'
NC='\033[0m' # No Color

if [[ -z "${BDMSYS}" ]]; then
  echo -e "${RED}Please source BioDynaMo before building the website${NC}"
  exit 1
fi

if [[ -z "${BDM_DIR}" ]]; then
  echo -e "${RED}Please pass the BioDynaMo project directory with --dir <path/to/biodynamo>${NC}"
  exit 1
fi

set -e -x

# Ask first for sudo password for later docker commands
sudo -v

SCRIPT_PATH=$(readlink -e $(dirname "${BASH_SOURCE[0]}"))

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing generated API files
rm -rf ${SCRIPT_PATH}/static/bioapi

# Copy Doxygen files (pre-generated when `make website` is called)
if [ ! -z "${API+x}" ]; then
  # Check if the API files are generated
  if [ -z "$(ls -A ${BDM_DIR}/build/doc/api)" ]; then
    echo "Doxygen files were not generated. Make sure they can be found in ${BDM_DIR}/build/doc/api"
    exit 1
  fi
  echo "Copying API docs to Gatsby directory"
  cp -R ${BDM_DIR}/build/doc/api ${SCRIPT_PATH}/static/bioapi
fi

# Copy markdown files that Gatsby expects in content/biodynamo
cp -R ${BDM_DIR}/doc ${SCRIPT_PATH}/content/biodynamo/

pushd $SCRIPT_PATH/docker
sudo docker build --network=host \
  --build-arg HOST_UID=$(id -u `whoami`) \
  --build-arg HOST_GID=$(id -g `whoami`) \
  -t bdm-website \
  .
popd

cp ${SCRIPT_PATH}/.env.example ${SCRIPT_PATH}/.env.development
cp ${SCRIPT_PATH}/.env.example ${SCRIPT_PATH}/.env.production
sudo docker stop mybdmweb || true
sudo docker rm mybdmweb || true
if [ ! -z "${SERVE+x}" ]; then
  sudo docker run -it --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website bash -c 'yarn && gatsby build && gatsby serve'
else
  sudo docker run -it --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website bash -c 'yarn && gatsby build'
fi
