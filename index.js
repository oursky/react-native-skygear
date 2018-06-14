#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
  initRNWithProjectName,
  cleanupProject,
  modifiyEnvConfig,
  runPodInstall,
} = require('./src/rn-cli');
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter Project Name ...',
    validate: input => {
      if (input === '') {
        return 'Project name cannot be empty.';
      } else {
        return true;
      }
    },
  },
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
    default: answers => {
      return `${answers.projectName.toLowerCase()}-development-api-key`;
    },
  },
  {
    type: 'input',
    name: 'skygearEndPointStaging',
    message: 'Enter Skygear End Point (Staging) ...',
    default: answers => {
      return `https://${answers.projectName.toLowerCase()}.staging.skygeario.com/`;
    },
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
    default: answers => {
      return `https://${answers.projectName.toLowerCase()}.skygeario.com/`;
    },
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
  .command('init')
  .description('init a react native project')
  .action(() => {
    prompt(questions).then(answers => {
      initRNWithProjectName(answers.projectName);
      cleanupProject(answers.projectName);
      runPodInstall(answers.projectName);
      modifiyEnvConfig(answers);
    });
  });

program.parse(process.argv);
