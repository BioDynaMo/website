#!/bin/bash

cd /website 
rm /website/node_modules || true
ln -s $HOME/node_modules /website/node_modules
cp $HOME/yarn.lock yarn.lock
