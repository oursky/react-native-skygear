const execSync = require('child_process').execSync;
const envfile = require('envfile');
const fileUrl = require('file-url');
const fs = require('fs');
const path = require('path');

//call react-native init <projectName> --template <template file path>
const initRNWithProjectName = projectName => {

  const templateFileURL = fileUrl(
    path.resolve(
      __dirname,
      '..',
      'templates',
      'react-native-template-oursky'
    )
  );
  execSync(`react-native init ${projectName} --template ${templateFileURL}`, {
    stdio: 'inherit',
  });
};

//call cleanup.js on generated project
const cleanupProject = projectName => {
  execSync(`cd ${projectName} && node cleanup.js`, {
    stdio: 'inherit',
  });
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
  cleanupProject,
  modifiyEnvConfig,
  runPodInstall,
};
