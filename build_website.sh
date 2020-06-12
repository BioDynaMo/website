#!/bin/bash

# Parse options (from: https://stackoverflow.com/a/33826763)
while [[ "$#" -gt 0 ]]; do case $1 in
  -a|--api) API=1;;
  -d|--develop) DEVELOP=1;;
  --dir) BDM_DIR="$2"; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

RED='\033[0;31m'
NC='\033[0m' # No Color

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
fi

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

# If we want to develop (in live mode)
if [ ! -z "${DEVELOP+x}" ]; then
  # If we want to generate static file for the API guide
  if [ ! -z "${API+x}" ]; then
    sudo docker run \
      -i \
      --net=host \
      --name=mybdmweb \
      -v ${SCRIPT_PATH}:/website \
      -v ${BDM_DIR}/build/doc/api:/website/static/bioapi \
      -v ${BDM_DIR}/doc:/website/content/biodynamo/doc \
      bdm-website bash -c 'yarn && gatsby build && gatsby develop'
  else
    sudo docker run \
      -i \
      --net=host \
      --name=mybdmweb \
      -v ${SCRIPT_PATH}:/website \
      -v ${BDM_DIR}/doc:/website/content/biodynamo/doc \
      bdm-website bash -c 'yarn && gatsby build && gatsby develop'
  fi
else
  # If we want to just build the static files
  sudo docker run \
    -i \
    --net=host \
    --name=mybdmweb \
    -v ${SCRIPT_PATH}:/website \
    -v ${BDM_DIR}/build/doc/api:/website/static/bioapi \
    -v ${BDM_DIR}/doc:/website/content/biodynamo/doc \
    bdm-website bash -c 'yarn && gatsby build'
fi
