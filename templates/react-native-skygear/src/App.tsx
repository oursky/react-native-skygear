import skygear from "skygear/react-native";

import * as React from "react";
import { Sentry } from "react-native-sentry";
import { Provider as ReduxStoreProvider } from "react-redux";

import { LocaleProvider } from "@oursky/react-messageformat";

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
    // eslint-disable-next-line
    console.log(`Running with ${JSON.stringify(Config)}`);

    skygear.config({
      apiKey: Config.SKYGEAR_APIKEY,
      endPoint: Config.SKYGEAR_ENDPOINT,
    });

    setupSentry();
  }

  render() {
    return (
      <ReduxStoreProvider store={store}>
        <LocaleProvider locale="en" messageByID={en}>
          <AppNavigator />
        </LocaleProvider>
      </ReduxStoreProvider>
    );
  }
}
