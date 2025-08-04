#!/bin/bash

# Set NVM environment
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

NODE_VERSION="20.18.0"

# Check if Node version is installed
if ! nvm ls "$NODE_VERSION" | grep -q "$NODE_VERSION"; then
  echo "Node version $NODE_VERSION is not installed. Installing..."
  nvm install "$NODE_VERSION"
else
  echo "Node version $NODE_VERSION is already installed."
fi

# Use the specified version
nvm use "$NODE_VERSION"

# Run your npm or Node command
npm run start
