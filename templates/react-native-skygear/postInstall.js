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
packageJson["scripts"]["lint"] =
  "tslint --project tsconfig.json --config tslint.json --format verbose";
packageJson["scripts"]["run-ci"] =
  "yarn tsc && prettier --list-different 'src/**/*.{ts,tsx}' && yarn lint";

writeToFile("package.json", JSON.stringify(packageJson, null, 2));
removeFile("App.js");
removeFile(".flowconfig");
removeFile("postInstall.js");
