#/bin/sh
TARGET_ENV=".env"
RNCDIR="./node_modules/react-native-config/ios"



if [ ! -z "$SYMROOT" ]; then
  # Ensure directories exist before copying files
  mkdir -p $SYMROOT
  mkdir -p $BUILD_DIR

  if [ "${CONFIGURATION}" = "Debug" ]; then
    TARGET_ENV="app.env.development"
    echo "app.env.development" > /tmp/envfile
  fi

  if [ "${CONFIGURATION}" = "Staging" ]; then
    TARGET_ENV="app.env.staging"
    echo "app.env.staging" > /tmp/envfile
  fi

  if [ "${CONFIGURATION}" = "Production" ]; then
    TARGET_ENV="app.env.production"
    echo "app.env.production" > /tmp/envfile
  fi

  # Build dotenv
  cd $RNCDIR
  ./ReactNativeConfig/BuildDotenvConfig.ruby
  cd -
  echo $SYMROOT
  # Copy generated dotenv files to node_modules directory
  cp "$SYMROOT/GeneratedDotEnv.m" "$RNCDIR/ReactNativeConfig/GeneratedDotEnv.m"
fi