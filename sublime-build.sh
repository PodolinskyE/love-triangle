#!bin/bash

# kill `ps -ef | grep index.js | grep -v grep | awk '{ print $2 }'`;
ps -ef | grep src/index.js | grep -v grep | awk '{print $2}' | xargs kill;

node --inspect-brk src/index.js;
