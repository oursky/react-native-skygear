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
    default: `${name.toLowerCase()}_api_key`,
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

const isValidProjectName = name => name.match(/^[$A-Z_][0-9A-Z_$]*$/i);

program.version('0.0.1').description('React Native Skygear CLI');

program
  .command('init <name>')
  .description('init a react native project')
  .option('-s, --server-only', 'Setup skygear server only')
  .action((name, cmd) => {
    if (!isValidProjectName(name)) {
      console.error(
        `${name} is not a valid name for a project. Please use a valid identifier name (alphanumeric).`
      );
      return;
    }

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
          console.log('All Completed');
        });
      });
    }
  });

program.on('command:*', () => {
  console.error('Invalid command: %s', program.args.join(' '));
  program.help();
});

program.parse(process.argv);
if (program.args.length === 0) {
  console.error(
    "You didn't pass any command\nSee --help for a list of available commands."
  );
}
