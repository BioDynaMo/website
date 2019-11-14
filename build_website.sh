#!/bin/bash

# Parse options (from: https://stackoverflow.com/a/33826763)
while [[ "$#" -gt 0 ]]; do case $1 in
  -a|--api) API=1;;
  -s|--serve) SERVE=1;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

RED='\033[0;31m'
NC='\033[0m' # No Color

set -e -x

# Ask first for sudo password for later docker commands
sudo -v

if [[ -z "${BDMSYS}" ]]; then
  echo -e "${RED}Please source BioDynaMo before building the website${NC}"
  exit 1
fi

SCRIPT_PATH=$(readlink -e $(dirname "${BASH_SOURCE[0]}"))
BDM_SRC_DIR=${SCRIPT_PATH}/content/biodynamo

git submodule update --init --recursive
pushd ${BDM_SRC_DIR} && git pull && popd

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing build directory
rm -rf ${BDM_SRC_DIR}/build ${SCRIPT_PATH}/static/bioapi

if [ ! -z "${API+x}" ]; then
  # Build the Doxygen documentation files
  pushd ${BDM_SRC_DIR}
  mkdir build && cd build && cmake ..
  make doc
  popd
  echo "Copying API docs to Gatsby directory"
  cp -R ${BDM_SRC_DIR}/build/doc/api ${SCRIPT_PATH}/static/bioapi
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
if [ ! -z "${SERVE+x}" ]; then
  SERVE_CMD="yarn && gatsby build && gatby serve"
fi
sudo docker run -itd --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website $SERVE_CMD
sudo docker exec -itd mybdmweb /website/
sudo docker attach mybdmweb

