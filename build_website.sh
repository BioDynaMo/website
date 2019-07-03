#!/bin/bash

set -e -x

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

git submodule update --init

sudo docker build --network=host \
  --build-arg HOST_UID=$(id -u `whoami`) \
  --build-arg HOST_GID=$(id -g `whoami`) \
  -t bdm-website \
  .
cp ${MY_PATH}/.env.example ${MY_PATH}/.env.development
sudo docker run -dit --net=host --name=mybdmweb -v ${MY_PATH}:/website bdm-website
