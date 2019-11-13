#!/bin/bash

# Parse options (from: https://stackoverflow.com/a/33826763)
while [[ "$#" -gt 0 ]]; do case $1 in
  -a|--api) api=1;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

set -e -x

# Ask first for sudo password for later docker commands
sudo -v

SCRIPT_PATH=$(readlink -e $(dirname "${BASH_SOURCE[0]}"))

git submodule update --init --recursive
git pull --recurse-submodules
git submodule foreach git pull 

# clear cache
rm -rf .cache/ node_modules/ public/

BDM_SRC_DIR=${SCRIPT_PATH}/content/biodynamo

# Delete any existing build directory
rm -rf ${BDM_SRC_DIR}/build ${SCRIPT_PATH}/static/bioapi

if [ "$api" -eq "1" ]; then
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
sudo docker stop mybdmweb || true
sudo docker rm mybdmweb || true
sudo docker run -itd --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website
sudo docker attach mybdmweb
