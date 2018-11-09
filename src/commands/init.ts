import * as path from "path";
import * as fs from "fs";

import { CommanderStatic } from "commander";
import { prompt, Questions } from "inquirer";
import * as envfile from "envfile";
import * as semver from "semver";

import * as Config from "../config";
import { getVersion as getYarnVersion } from "../cli/yarn";
import { getVersion as getRNCliVersion } from "../cli/reactNativeCli";

import generateReactNativeProject, {
  ReactNativeTemplate,
} from "../generator/generateReactNativeProject";
import { validateProjectName } from "../validation";
import installSentry from "../generator/installSentry";
import { Maybe } from "src/types";

export interface ProjectSetupConfig {
  skygearEndPointDevelopment: string;
  skygearAPIKeyDevelopment: string;
  skygearEndPointStaging: string;
  skygearAPIKeyStaging: string;
  skygearEndPointProduction: string;
  skygearAPIKeyProduction: string;
  sentryDSNDevelopment: string;
  sentryDSNStaging: string;
  sentryDSNProduction: string;
  sentryToken: string;
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

function makeDefaultProjectSetupConfig(
  projectName: string
): ProjectSetupConfig {
  return {
    skygearEndPointDevelopment: "http://127.0.0.1:3000/",
    skygearAPIKeyDevelopment: projectName.toLowerCase(),
    skygearEndPointStaging: `https://${projectName.toLowerCase()}.staging.skygeario.com/`,
    skygearAPIKeyStaging: "",
    skygearEndPointProduction: `https://${projectName.toLowerCase()}.skygeario.com/`,
    skygearAPIKeyProduction: "",
    sentryDSNDevelopment: "",
    sentryDSNStaging: "",
    sentryDSNProduction: "",
    sentryToken: "",
  };
}

function makeQuestionsAboutProjectSetup(
  projectName: string
): Questions<ProjectSetupConfig> {
  const defaultProjectSetupConfig = makeDefaultProjectSetupConfig(projectName);
  return [
    {
      type: "input",
      name: "skygearEndPointDevelopment",
      message: "Enter Skygear End Point (Development) ...",
      default: defaultProjectSetupConfig.skygearEndPointDevelopment,
    },
    {
      type: "input",
      name: "skygearAPIKeyDevelopment",
      message: "Enter Skygear API Key (Development) ...",
      default: defaultProjectSetupConfig.skygearAPIKeyDevelopment,
    },
    {
      type: "input",
      name: "skygearEndPointStaging",
      message: "Enter Skygear End Point (Staging) ...",
      default: defaultProjectSetupConfig.skygearEndPointStaging,
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
      default: defaultProjectSetupConfig.skygearEndPointProduction,
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
    {
      type: "input",
      name: "sentryToken",
      message: "Enter Sentry Token ...",
    },
  ];
}

function addConfigToEnvFile(
  projectName: string,
  buildConfig: BuildConfig,
  projectConfig: ProjectConfig
) {
  let envFileName = ".env";
  if (buildConfig !== BuildConfig.dev) {
    envFileName = `.env.${buildConfig}`;
  }
  const envFilePath = path.resolve(projectName, envFileName);
  const oldEnv = envfile.parseFileSync(envFilePath);
  const newEnv = {
    ...oldEnv,
    ...projectConfig,
  };
  fs.writeFileSync(envFilePath, envfile.stringifySync(newEnv));
}

export function registerCommand(program: CommanderStatic) {
  program
    .command("init <projectName>")
    .option("-t, --helloworld", "HelloWorld")
    .description("Create React Native project with Skygear with name")
    .action((projectName: string, options: { helloworld: boolean }) => {
      const isProjectNameValid = validateProjectName(projectName);
      if (!isProjectNameValid) {
        console.error(
          `${projectName} is not a valid name for a project.` +
            "Please use a valid identifier name (alphanumeric)."
        );
        return;
      }

      const yarnVersionIsValid = getYarnVersion().map(version =>
        semver.gte(version, Config.TARGET_YARN_VERSION)
      );

      if (Maybe.isNone(yarnVersionIsValid)) {
        console.error("Please install yarn\nHint: npm i -g yarn");
        return;
      } else if (!yarnVersionIsValid.getValue()) {
        console.error(
          `This cli requires Yarn with version ${Config.TARGET_YARN_VERSION}`
        );
        return;
      }

      const reactNativeCliVersionIsValid = getRNCliVersion().map(version =>
        semver.gte(version, Config.TARGET_RN_CLI_VERSION)
      );

      if (Maybe.isNone(reactNativeCliVersionIsValid)) {
        console.error(
          "Please install react native cli \n Hint: npm i -g react-native-cli"
        );
        return;
      } else if (!reactNativeCliVersionIsValid.getValue()) {
        console.error(
          `This cli requires react-native-cli with version ${
            Config.TARGET_RN_CLI_VERSION
          }`
        );
        return;
      }

      Promise.resolve(options.helloworld)
        .then(useHelloWorld => {
          if (useHelloWorld) {
            return Promise.resolve(makeDefaultProjectSetupConfig(projectName));
          }
          return prompt(makeQuestionsAboutProjectSetup(projectName));
        })
        .then(config => {
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
          // Note(cychiuae)
          // Because this anonying setup wizard for react-native-sentry
          // react-native-sentry is installed separately
          installSentry(projectName, config);
        });
    });
}
