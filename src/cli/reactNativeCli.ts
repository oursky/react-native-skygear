import { execSync } from "child_process";

import { Maybe } from "src/types";

// Inspired from react-native-cli
export function getVersion(): Maybe<string> {
  let cliVersion: string;

  try {
    cliVersion = (
      execSync("react-native --version", {
        stdio: [0, "pipe", "ignore"],
      }).toString() || ""
    ).trim();
  } catch (e) {
    return Maybe.none();
  }

  if (cliVersion == "") {
    return Maybe.none();
  }

  return Maybe.just(cliVersion);
}
