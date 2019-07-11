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

FROM ubuntu:16.04

RUN apt update && apt install -y \
  sudo \
  git \
  build-essential \
  curl \
  software-properties-common \
  apt-transport-https

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash

RUN apt update && apt install -y \
  nodejs \
  yarn

RUN npm install -g gatsby-cli

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

ENTRYPOINT bash -c "yarn && gatsby develop"

WORKDIR website
