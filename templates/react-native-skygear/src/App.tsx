import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Sentry } from "react-native-sentry";

import { Provider as LocalizationProvider } from "@oursky/react-messageformat";

import AppNavigator from "./components/AppNavigator";

import en from "./i18n/en";
import * as Config from "./Config";

function setupSentry(): Promise<void> {
  if (!Config.SENTRY_DSN) {
    return Promise.resolve();
  }
  return Sentry.config(Config.SENTRY_DSN).install();
}

export default class App extends React.Component {
  componentDidMount() {
    console.log(`Running with ${JSON.stringify(Config)}`);
    // tslint:disable-next-line: no-floating-promises
    setupSentry();
  }

  render() {
    return (
      <LocalizationProvider locale="en" messageByID={en}>
        <AppNavigator />
      </LocalizationProvider>
    );
  }
}
