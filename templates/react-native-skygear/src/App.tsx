import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Sentry } from "react-native-sentry";

import { Provider as LocalizationProvider } from "@oursky/react-messageformat";

import { AppText, LocalizedText } from "./components/Text";

import en from "./i18n/en";
import * as Config from "./Config";

function setupSentry(): Promise<void> {
  if (!Config.SENTRY_DSN) {
    return Promise.resolve();
  }
  return Sentry.config(Config.SENTRY_DSN).install();
}

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    console.log(`Running with ${JSON.stringify(Config)}`);
    setupSentry();
  }

  render() {
    return (
      <LocalizationProvider locale="en" messageByID={en}>
        <View style={styles.container}>
          <LocalizedText style={styles.welcome} messageID="app.welcome" />
          <LocalizedText
            style={styles.instructions}
            messageID="app.get_started"
          />
          <AppText style={styles.instructions}>{instructions}</AppText>
        </View>
      </LocalizationProvider>
    );
  }
}
