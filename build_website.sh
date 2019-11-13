#!/bin/bash

# Parse options (from: https://stackoverflow.com/a/33826763)
while [[ "$#" -gt 0 ]]; do case $1 in
  -a|--api) api=1;;
  -b|--build-dir) BUILD_DIR="$2"; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

set -e -x

# Ask first for sudo password for later docker commands
sudo -v

SCRIPT_PATH=$(readlink -e $(dirname "${BASH_SOURCE[0]}"))
BDM_SRC_DIR=${SCRIPT_PATH}/content/biodynamo

if [ -z ${BUILD_DIR+x} ]; then
  git submodule update --init --recursive
  pushd ${BDM_SRC_DIR} && git pull && popd
fi

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing build directory
rm -rf ${BDM_SRC_DIR}/build ${SCRIPT_PATH}/static/bioapi

if [ ! -z "${api+x}" ]; then
  if [ -z ${BUILD_DIR+x} ]; then
    # Build the Doxygen documentation files
    pushd ${BDM_SRC_DIR}
    mkdir build && cd build && cmake ..
    make doc
    popd
    echo "Copying API docs to Gatsby directory"
    cp -R ${BDM_SRC_DIR}/build/doc/api ${SCRIPT_PATH}/static/bioapi
  else
    cp -R ${BUILD_DIR}/doc/api ${SCRIPT_PATH}/static/bioapi
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
sudo docker run -itd --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website
sudo docker attach mybdmweb
