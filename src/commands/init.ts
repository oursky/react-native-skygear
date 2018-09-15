import * as path from "path";
import * as fs from "fs";

import { CommanderStatic } from "commander";
import { prompt, Questions } from "inquirer";
import * as envfile from "envfile";

import generateReactNativeProject, {
  ReactNativeTemplate,
} from "../generator/generateReactNativeProject";
import { validateProjectName } from "../validation";

interface ProjectSetupConfig {
  skygearEndPointDevelopment: string;
  skygearAPIKeyDevelopment: string;
  skygearEndPointStaging: string;
  skygearAPIKeyStaging: string;
  skygearEndPointProduction: string;
  skygearAPIKeyProduction: string;
  sentryDSNDevelopment: string;
  sentryDSNStaging: string;
  sentryDSNProduction: string;
}

interface ProjectConfig {
  skygearEndPoint: string;
  skygearAPIKey: string;
  sentryDSN: string;
}

enum BuildConfig {
  dev = "dev",
  nightly = "nightly",
  staging = "staging",
  production = "production",
}

function makeQuestionsAboutProjectSetup(
  projectName: string
): Questions<ProjectSetupConfig> {
  return [
    {
      type: "input",
      name: "skygearEndPointDevelopment",
      message: "Enter Skygear End Point (Development) ...",
      default: "http://127.0.0.1:3000/",
    },
    {
      type: "input",
      name: "skygearAPIKeyDevelopment",
      message: "Enter Skygear API Key (Development) ...",
      default: projectName.toLowerCase(),
    },
    {
      type: "input",
      name: "skygearEndPointStaging",
      message: "Enter Skygear End Point (Staging) ...",
      default: `https://${projectName.toLowerCase()}.staging.skygeario.com/`,
    },
    {
      type: "input",
      name: "skygearAPIKeyStaging",
      message: "Enter Skygear API Key (Staging) ...",
    },
    {
      type: "input",
      name: "skygearEndPointProduction",
      message: "Enter Skygear End Point (Production) ...",
      default: `https://${projectName.toLowerCase()}.skygeario.com/`,
    },
    {
      type: "input",
      name: "skygearAPIKeyProduction",
      message: "Enter Skygear API Key (Production) ...",
    },
    {
      type: "input",
      name: "sentryDSNDevelopment",
      message: "Enter Sentry DSN (Development) ...",
    },
    {
      type: "input",
      name: "sentryDSNStaging",
      message: "Enter Sentry DSN (Staging) ...",
    },
    {
      type: "input",
      name: "sentryDSNProduction",
      message: "Enter Sentry DSN (Production) ...",
    },
  ];
}

function addConfigToEnvFile(
  projectName: string,
  buildConfig: BuildConfig,
  projectConfig: ProjectConfig
) {
  let envFileName = ".env";
  if (buildConfig != BuildConfig.dev) {
    envFileName = `.env.${buildConfig}`;
  }
  const envFilePath = path.resolve(projectName, envFileName);
  const oldEnv = envfile.parseFileSync(envFilePath);
  const newEnv = Object.assign(oldEnv, projectConfig);
  fs.writeFileSync(envFilePath, envfile.stringifySync(newEnv));
}

export function registerCommand(program: CommanderStatic) {
  program
    .command("init <projectName>")
    .description("Create React Native project with Skygear with name")
    .action((projectName: string) => {
      const isProjectNameValid = validateProjectName(projectName);
      if (!isProjectNameValid) {
        console.error(
          `${projectName} is not a valid name for a project.` +
            "Please use a valid identifier name (alphanumeric)."
        );
        return;
      }

      prompt(makeQuestionsAboutProjectSetup(projectName)).then(config => {
        generateReactNativeProject(projectName, ReactNativeTemplate.Skygear);
        addConfigToEnvFile(projectName, BuildConfig.dev, {
          sentryDSN: config.sentryDSNDevelopment,
          skygearAPIKey: config.skygearAPIKeyDevelopment,
          skygearEndPoint: config.skygearEndPointDevelopment,
        });
        addConfigToEnvFile(projectName, BuildConfig.nightly, {
          sentryDSN: config.sentryDSNStaging,
          skygearAPIKey: config.skygearAPIKeyStaging,
          skygearEndPoint: config.skygearEndPointStaging,
        });
        addConfigToEnvFile(projectName, BuildConfig.staging, {
          sentryDSN: config.sentryDSNStaging,
          skygearAPIKey: config.skygearAPIKeyStaging,
          skygearEndPoint: config.skygearEndPointStaging,
        });
        addConfigToEnvFile(projectName, BuildConfig.production, {
          sentryDSN: config.sentryDSNProduction,
          skygearAPIKey: config.skygearAPIKeyProduction,
          skygearEndPoint: config.skygearEndPointProduction,
        });
      });
    });
}
