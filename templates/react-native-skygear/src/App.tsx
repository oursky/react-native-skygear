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

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    // eslint-disable-next-line
    console.log(`Running with ${JSON.stringify(Config)}`);

    Promise.all([
      skygear.config({
        apiKey: Config.SKYGEAR_APIKEY,
        endPoint: Config.SKYGEAR_ENDPOINT,
      }),
      setupSentry(),
    ]).then(() => {
      setIsReady(true);
    });
  }, []);

  return (
    <ReduxStoreProvider store={store}>
      <LocaleProvider locale="en" messageByID={en}>
        {isReady && <AppNavigator />}
      </LocaleProvider>
    </ReduxStoreProvider>
  );
}
