#!/bin/bash

set -e -x

SCRIPT_PATH=$(readlink -e $(dirname "${BASH_SOURCE[0]}"))

git submodule update --init

pushd $SCRIPT_PATH/docker
sudo docker build --network=host \
  --build-arg HOST_UID=$(id -u `whoami`) \
  --build-arg HOST_GID=$(id -g `whoami`) \
  -t bdm-website \
  .
popd

cp ${SCRIPT_PATH}/.env.example ${SCRIPT_PATH}/.env.development
sudo docker stop mybdmweb
sudo docker rm mybdmweb
sudo docker run -it --net=host --name=mybdmweb -v ${SCRIPT_PATH}:/website bdm-website
