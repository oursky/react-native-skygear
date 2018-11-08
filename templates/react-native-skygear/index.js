import { AppRegistry } from "react-native";
import App from "./src/App";
import "intl";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
