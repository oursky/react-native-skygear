#!/bin/bash -e

PROJECT_DIR="$HOME/create-react-native-skygear-integration"
PROJECT_NAME=HelloWorld

yarn build
./bin/index.js init --helloworld "$PROJECT_NAME"
rm -rf "$PROJECT_DIR/$PROJECT_NAME"
mkdir -p "$PROJECT_DIR"
mv "$PROJECT_NAME" "$PROJECT_DIR"
pushd "$PROJECT_DIR/$PROJECT_NAME"
yarn run-ci
if [ "$1" = "ios" ]; then
  react-native run-ios
elif [ "$1" = "android" ]; then
  pushd android
  ./gradlew tasks
  ./gradlew assembleDevelopmentDebug
  popd
  mkdir -p output/res
  react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./output/index.android.bundle --assets-dest ./output/res/
fi
rm -rf "$PROJECT_DIR"
popd
