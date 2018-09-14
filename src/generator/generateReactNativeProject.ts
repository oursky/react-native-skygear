import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export enum ReactNativeTemplate {
  Skygear = "react-native-skygear",
}

function resolveTemplateFilePath(template: ReactNativeTemplate): string {
  return `file://${path.resolve(__dirname, "../../templates", template)}`;
}

export default function generateReactNativeProject(
  projectName: string,
  template: ReactNativeTemplate
) {
  const templateFilePath = resolveTemplateFilePath(template);
  execSync(`react-native init ${projectName} --template ${templateFilePath}`, {
    stdio: "inherit",
  });
  const postInstallScript = `${projectName}/postInstall.js`;
  if (fs.existsSync(postInstallScript)) {
    execSync(`node ${postInstallScript}`, {
      stdio: "inherit",
    });
  }
  execSync(
    `find ${projectName}/android/app/src/main/java/com -name '*.java' -print | sed 's/\\(.*\\)\\.java/  & \\1.kt/' | xargs -L1 mv`,
    {
      stdio: "inherit",
    }
  );
}
