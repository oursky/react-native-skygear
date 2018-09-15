import * as process from "process";
import { execSync } from "child_process";

export default function installSentry(projectName: string) {
  process.chdir(projectName);
  execSync(`yarn add react-native-sentry -E`, {
    stdio: "inherit",
  });
  execSync("react-native link react-native-sentry", {
    stdio: "inherit",
  });
  process.chdir("..");
}
