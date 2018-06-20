const execSync = require('child_process').execSync;
const envfile = require('envfile');
const fileUrl = require('file-url');
const fs = require('fs');
const path = require('path');
const { init } = require('react-native/react-native-cli');

//call react-native init <projectName> --template <template file path>
const initRNWithProjectName = projectName => {
  const templateFileURL = fileUrl(
    path.resolve(__dirname, '..', 'templates', 'react-native-template-oursky')
  );

  //Since init() will change the current process directory
  const currentDirectory = path.resolve();
  init(projectName, [projectName, '--template', templateFileURL]);
  process.chdir(currentDirectory);
};

//call updated package.json on generated project
const updatePackageJson = projectName => {
  const fileName = 'package.json';
  const packageFile = path.resolve(projectName, fileName);
  let file = require(packageFile);
  //these are the scripts that will be added to package.json
  console.log(`Adding scripts to package.json`);
  file.scripts[
    'ios'
  ] = `node node_modules/react-native/local-cli/cli.js run-ios --scheme "${projectName} Development"`;
  file.scripts[
    'android'
  ] = `node node_modules/react-native/local-cli/cli.js run-android`;
  file.scripts['format'] =
    "prettier --write --list-different 'js/**/*.{js,jsx,ts,tsx}'";
  file.scripts['lint'] =
    'tslint --project tsconfig.json --config tslint.json --format verbose';
  file.scripts['typecheck'] = 'tsc --noEmit';

  file.jest['moduleFileExtensions'] = ['ts', 'tsx', 'js'];

  file.jest['transform'] = {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  };

  file.jest['testRegex'] = '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$';
  file.jest['testPathIgnorePatterns'] = ['\\.snap$', '<rootDir>/node_modules/'];
  file.jest['cacheDirectory'] = '.jest/cache';
  fs.writeFileSync(packageFile, JSON.stringify(file, null, 2));
};

//inject skygear config and sentry config to .env files
const modifiyEnvConfig = (name, config) => {
  mergeEnvFile(path.resolve(name, 'app.env.development'), {
    SKYGEAR_ENDPOINT: config.skygearEndPointDevelopment,
    SKYGEAR_API_KEY: config.skygearAPIKeyDevelopment,
    SENTRY_DSN: config.sentryDSNDevelopment,
  });
  mergeEnvFile(path.resolve(name, 'app.env.staging'), {
    SKYGEAR_ENDPOINT: config.skygearEndPointStaging,
    SKYGEAR_API_KEY: config.skygearAPIKeyStaging,
    SENTRY_DSN: config.sentryDSNStaging,
  });
  mergeEnvFile(path.resolve(name, 'app.env.production'), {
    SKYGEAR_ENDPOINT: config.skygearEndPointProduction,
    SKYGEAR_API_KEY: config.skygearAPIKeyProduction,
    SENTRY_DSN: config.sentryDSNProduction,
  });
};

const mergeEnvFile = (path, config) => {
  const oldEnv = envfile.parseFileSync(path);
  const newEnv = Object.assign(oldEnv, config);
  fs.writeFileSync(path, envfile.stringifySync(newEnv));
};

const runPodInstall = projectName => {
  execSync(`cd ${projectName}/ios && pod install`, {
    stdio: 'inherit',
  });
};

module.exports = {
  initRNWithProjectName,
  updatePackageJson,
  modifiyEnvConfig,
  runPodInstall,
};
