import { execSync } from "child_process";
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
}
