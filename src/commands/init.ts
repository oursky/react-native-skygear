import { CommanderStatic } from "commander";
import { prompt, Questions } from "inquirer";

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
        // TODO
        console.log(config);
      });
    });
}
