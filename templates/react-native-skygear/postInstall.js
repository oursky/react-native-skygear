const fs = require("fs");
const path = require("path");

function writeToFile(fileName, data) {
  fs.writeFileSync(path.resolve(__dirname, fileName), data);
}

function removeFile(fileName) {
  fs.unlinkSync(path.resolve(__dirname, fileName));
}

const packageJson = require(path.resolve(__dirname, "package.json"));
packageJson["scripts"]["tsc"] = "tsc --noEmit";
packageJson["scripts"]["format"] =
  "prettier --write --list-different 'src/**/*.{ts,tsx}'";
packageJson["scripts"]["lint"] = "eslint 'src/**/*.{js,jsx,ts,tsx}'";
packageJson["scripts"]["run-ci"] =
  "yarn tsc && prettier --list-different 'src/**/*.{ts,tsx}' && yarn lint";
packageJson["scripts"]["postinstall"] = "react-native-schemes-manager all";
packageJson["xcodeSchemes"] = {
  Debug: [],
  Release: ["Staging", "Nightly"],
  settings: {
    "fix-script": {
      projectDirectory: "iOS",
      nodeCommand:
        "$NODE_BINARY ../node_modules/@sentry/cli/bin/sentry-cli react-native xcode",
    },
  },
};

writeToFile("package.json", JSON.stringify(packageJson, null, 2));
removeFile("App.js");
removeFile(".flowconfig");
removeFile("postInstall.js");
