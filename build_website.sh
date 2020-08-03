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

# Use greadlink on macOS
if [[ $(uname -s) = "Darwin"* ]]; then
  READLINK="greadlink"
else
  READLINK="readlink"
fi

SCRIPT_PATH=$($READLINK -e $(dirname "${BASH_SOURCE[0]}"))

# clear cache
rm -rf .cache/ node_modules/ public/

# Delete any existing generated API files
rm -rf ${SCRIPT_PATH}/static/api

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

mkdir -p ${BDM_DIR}/build/website/static/notebooks/
mkdir -p ${BDM_DIR}/build/website/static/images/notebooks/

# Copy the generated html notebooks into the static folder
for d in ${BDM_DIR}/build/notebooks/*  ; do
  cp -v $d/*.html ${BDM_DIR}/build/website/static/notebooks/
  cp $d/thumbnail.png ${BDM_DIR}/build/website/static/images/notebooks/$(basename $d).png
done 

# If we want to develop (in live mode)
if [ ! -z "${DEVELOP+x}" ]; then
  # If we want to generate static file for the API guide
  if [ ! -z "${API+x}" ]; then
    sudo docker run \
      -i \
      -p 8000:8000 \
      --net=host \
      --name=mybdmweb \
      -v ${SCRIPT_PATH}:/website \
      -v ${BDM_DIR}/build/doc/api:/website/static/api \
      -v ${BDM_DIR}/doc:/website/content/biodynamo/doc \
      bdm-website bash -c 'yarn && gatsby build && gatsby develop'
  else
    sudo docker run \
      -i \
      -p 8000:8000 \
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
    -p 8000:8000 \
    --net=host \
    --name=mybdmweb \
    -v ${SCRIPT_PATH}:/website \
    -v ${BDM_DIR}/build/doc/api:/website/static/api \
    -v ${BDM_DIR}/doc:/website/content/biodynamo/doc \
    bdm-website bash -c 'yarn && gatsby build'
fi

# Copy JSROOT into /public/static for the visualizations to work
cp -R $BDM_DIR/build/third_party/root/js/* ${BDM_DIR}/build/website/public/static/

# Copy require.js to /public/static for visualizations to work
mkdir -p ${BDM_DIR}/build/website/public/static/components/requirejs
cp ${BDM_DIR}/build/website/node_modules/requirejs/require.js ${BDM_DIR}/build/website/public/static/components/requirejs/

# Patch for ROOT 6.22/00 (https://github.com/root-project/root/commit/9ea9e129f20d3fcc3398bedbea989b7e8a14e69a)

if [ $($BDM_DIR/build/third_party/root/bin/root-config --version) == "6.22/00" ]; then
  sed -i -e 's/JSROOT.gStyle, style/JSROOT.gStyle, obj/g' ${BDM_DIR}/build/website/public/static/scripts/JSRootPainter.v6.js
fi
