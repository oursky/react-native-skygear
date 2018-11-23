import skygear from "skygear/react-native";

import * as React from "react";
import { Sentry } from "react-native-sentry";
import { Provider as ReduxStoreProvider } from "react-redux";

import { Provider as LocalizationProvider } from "@oursky/react-messageformat";

import AppNavigator from "./components/AppNavigator";

import en from "./i18n/en";
import * as Config from "./Config";
import { makeStore } from "./store";

function setupSentry(): Promise<void> {
  if (!Config.SENTRY_DSN) {
    return Promise.resolve();
  }
  return Sentry.config(Config.SENTRY_DSN).install();
}

const store = makeStore();

export default class App extends React.Component {
  componentDidMount() {
    console.log(`Running with ${JSON.stringify(Config)}`);

    // tslint:disable-next-line: no-floating-promises
    skygear.config({
      apiKey: Config.SKYGEAR_APIKEY,
      endPoint: Config.SKYGEAR_ENDPOINT,
    });

    // tslint:disable-next-line: no-floating-promises
    setupSentry();
  }

  render() {
    return (
      <ReduxStoreProvider store={store}>
        <LocalizationProvider locale="en" messageByID={en}>
          <AppNavigator />
        </LocalizationProvider>
      </ReduxStoreProvider>
    );
  }
}
