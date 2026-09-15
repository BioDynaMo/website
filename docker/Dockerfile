# -----------------------------------------------------------------------------
#
# Copyright (C) The BioDynaMo Project.
# All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
#
# See the LICENSE file distributed with this work for details.
# See the NOTICE file distributed with this work for additional information
# regarding copyright ownership.
#
# -----------------------------------------------------------------------------

# Keep the application's existing Node version without the obsolete NodeSource
# apt repository. This stage supplies binaries only; no Debian packages run.
FROM node:14.15.0-buster AS node-runtime

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
  sudo \
  git \
  build-essential \
  curl \
  ca-certificates \
  python3 \
  libx11-6 \
  libxext6 \
  libxi6 \
  libgl1 \
  && rm -rf /var/lib/apt/lists/*

# The official image includes npm in /usr/local and Yarn Classic in /opt.
COPY --from=node-runtime /usr/local/ /usr/local/
COPY --from=node-runtime /opt/ /opt/

# update user id and group id such that mapped volumes can be accessed with the
# same rights as on the host. Files created by the container can also be
# accessed on the host without chowning.
ARG HOST_UID
ARG HOST_GID

RUN groupadd -g $HOST_GID testuser ; \
    useradd -u $HOST_UID -g $HOST_GID -m -c "Testuser" testuser && \
    passwd --delete testuser && \
    echo "testuser ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER testuser

# Install yarn packages
WORKDIR /home/testuser
COPY --chown=testuser package.json entry.sh yarn.loc[k] /home/testuser/
RUN yarn install --frozen-lockfile

# build_website.sh invokes `gatsby` directly; use the project's own CLI version.
ENV PATH="/home/testuser/node_modules/.bin:${PATH}"

WORKDIR /website
