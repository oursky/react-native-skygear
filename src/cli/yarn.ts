import { execSync } from "child_process";

import { Maybe } from "../types";
import * as semver from "semver";

// Inspired from react-native-cli
export function getVersion(): Maybe<string> {
  let yarnVersion: string;

  try {
    yarnVersion = (
      execSync("yarn --version", {
        stdio: [0, "pipe", "ignore"],
      }).toString() || ""
    ).trim();
  } catch (e) {
    return Maybe.none();
  }

  if (yarnVersion === "") {
    return Maybe.none();
  }

  try {
    if (semver.gte(yarnVersion, "0.16.0")) {
      return Maybe.just(yarnVersion);
    }
  } catch (e) {
    return Maybe.none();
  }

  return Maybe.none();
}
