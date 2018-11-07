#!/bin/sh -e

yarn build
./bin/index.js init --helloworld HelloWorld
mv HelloWorld /tmp
pushd /tmp/HelloWorld
yarn run-ci
if [ "$1" = "ios" ]; then
  react-native run-ios
elif [ "$1" = "android" ]; then
  react-native run-android
fi
popd
