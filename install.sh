#!/bin/bash
echo "Installing Commitizen Globally"
npm install -g commitizen
echo "Installing JIRA smart commits"
sudo npm install -g git+https://@github.com:tomtobac/cz-jira-smart-commit.git
echo "Creating a global config file"
echo '{ "path": "/usr/lib/node_modules/cz-jira-smart-commit/" }' > ~/.czrc
