#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
  initRNWithProjectName,
  cleanupProject,
  modifiyEnvConfig,
  runPodInstall,
} = require('./src/rn-cli');
const { initServerWithProjectName } = require('./src/local-skygear-cli');

const makeQuestions = name => [
  {
    type: 'input',
    name: 'skygearEndPointDevelopment',
    message: 'Enter Skygear End Point (Development) ...',
    default: 'http://127.0.0.1:3000/',
  },
  {
    type: 'input',
    name: 'skygearAPIKeyDevelopment',
    message: 'Enter Skygear API Key (Development) ...',
    default: `${name.toLowerCase()}-development-api-key`,
  },
  {
    type: 'input',
    name: 'skygearEndPointStaging',
    message: 'Enter Skygear End Point (Staging) ...',
    default: `https://${name.toLowerCase()}.staging.skygeario.com/`,
  },
  {
    type: 'input',
    name: 'skygearAPIKeyStaging',
    message: 'Enter Skygear API Key (Staging) ...',
  },
  {
    type: 'input',
    name: 'skygearEndPointProduction',
    message: 'Enter Skygear End Point (Production) ...',
    default: `https://${name.toLowerCase()}.skygeario.com/`,
  },
  {
    type: 'input',
    name: 'skygearAPIKeyProduction',
    message: 'Enter Skygear API Key (Production) ...',
  },
  {
    type: 'input',
    name: 'sentryDSNDevelopment',
    message: 'Enter Sentry DSN (Development) ...',
  },
  {
    type: 'input',
    name: 'sentryDSNStaging',
    message: 'Enter Sentry DSN (Staging) ...',
  },
  {
    type: 'input',
    name: 'sentryDSNProduction',
    message: 'Enter Sentry DSN (Production) ...',
  },
];

program.version('0.0.1').description('React Native Skygear CLI');

program
  .command('init <name>')
  .description('init a react native project')
  .option('-s, --server-only', 'Setup skygear server only')
  .action((name, cmd) => {
    if (cmd.serverOnly) {
      initServerWithProjectName(name);
    } else {
      prompt(makeQuestions(name)).then(config => {
        initRNWithProjectName(name);
        cleanupProject(name);
        runPodInstall(name);
        modifiyEnvConfig(name, config);

        prompt({
          type: 'confirm',
          name: 'isInitServer',
          message: 'Also init local skygear server ?',
        }).then(({ isInitServer }) => {
          if (isInitServer) {
            initServerWithProjectName(name);
          }
        });
      });
    }
  });

program.parse(process.argv);
