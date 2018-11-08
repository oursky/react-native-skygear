import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { execSync } from "child_process";
import { ProjectSetupConfig } from "../commands/init";

interface SentryConfig {
  projectName: string;
  organizationName: string;
  dns: string;
  token: string;
}

function createSentryPropertiesFileContent(config: SentryConfig) {
  return `default.url=https://sentry.io/
defaults.org=${config.organizationName}
defaults.project=${config.projectName}
auth.token=${config.token}
cli.executable=node_modules/@sentry/cli/bin/sentry-cli`;
}

function writeSentryPropertiesFile(
  config: SentryConfig,
  savePath: string,
  symlinkPaths: string[]
) {
  const content = createSentryPropertiesFileContent(config);
  fs.writeFileSync(savePath, content);
  symlinkPaths.forEach(symlinkPath => {
    const saveAbsolutePath = path.resolve(process.cwd(), savePath);
    const symlinkAbsolutePath = path.resolve(process.cwd(), symlinkPath);
    const symlinkDirAbsolutePath = path.parse(symlinkAbsolutePath);
    const saveRelativePath = path.relative(
      symlinkDirAbsolutePath.dir,
      saveAbsolutePath
    );
    fs.symlinkSync(saveRelativePath, symlinkPath);
  });
}

export default function installSentry(
  projectName: string,
  config: ProjectSetupConfig
) {
  process.chdir(projectName);

  const devSentryConfig = {
    projectName,
    organizationName: "oursky",
    dns: config.sentryDSNDevelopment,
    token: config.sentryToken,
  };
  writeSentryPropertiesFile(devSentryConfig, "sentry-dev.properties", [
    "ios/sentry.properties",
    "ios/sentry-dev.properties",
    "android/sentry.properties",
    "android/sentry-devRelease.properties",
  ]);

  const stagingSentryConfig = {
    projectName,
    organizationName: "oursky",
    dns: config.sentryDSNStaging,
    token: config.sentryToken,
  };
  writeSentryPropertiesFile(stagingSentryConfig, "sentry-staging.properties", [
    "ios/sentry-staging.properties",
    "android/sentry-stagingRelease.properties",
  ]);

  const productionSentryConfig = {
    projectName,
    organizationName: "oursky",
    dns: config.sentryDSNProduction,
    token: config.sentryToken,
  };
  writeSentryPropertiesFile(
    productionSentryConfig,
    "sentry-production.properties",
    [
      "ios/sentry-production.properties",
      "android/sentry-productionRelease.properties",
    ]
  );
  execSync(`yarn add react-native-sentry -E`, {
    stdio: "inherit",
  });
  process.chdir("..");
}
