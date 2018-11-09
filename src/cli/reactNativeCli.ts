import { execSync } from "child_process";

import { Maybe } from "../types";

// Inspired from react-native-cli
export function getVersion(): Maybe<string> {
  let cliVersion: string;

  try {
    const info = (
      execSync("react-native --version", {
        stdio: [0, "pipe", "ignore"],
      }).toString() || ""
    ).trim();
    const matches = info.match(/react-native-cli\: (.*)/);
    cliVersion = matches != null && matches[1] != null ? matches[1] : "";
  } catch (e) {
    console.log(e);
    return Maybe.none();
  }

  if (cliVersion === "") {
    return Maybe.none();
  }

  return Maybe.just(cliVersion);
}
