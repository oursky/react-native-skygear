import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Sentry } from "react-native-sentry";
import skygear from "skygear/react-native";

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

type Request<T> = Loading | Success<T> | Failure;
enum RequestState {
  Loading,
  Success,
  Failure,
}
interface Loading {
  state: RequestState.Loading;
}

function Loading(): Loading {
  return {
    state: RequestState.Loading,
  };
}

interface Success<T> {
  state: RequestState.Success;
  value: T;
}

function Success<T>(value: T): Success<T> {
  return {
    state: RequestState.Success,
    value,
  };
}

interface Failure {
  state: RequestState.Failure;
  error: Error;
}

function Failure(error: Error): Failure {
  return {
    error,
    state: RequestState.Failure,
  };
}

interface Props {}
interface State {
  initialization: Request<void>;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialization: Loading(),
    };
  }

  componentDidMount() {
    console.log(`Running with ${JSON.stringify(Config)}`);
    setupSentry()
      .then(() => {
        skygear.config({
          apiKey: Config.SKYGEAR_APIKEY,
          endPoint: Config.SKYGEAR_ENDPOINT,
        });
      })
      .then(() => {
        this.setState({
          initialization: Success(undefined),
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          initialization: Failure(e),
        });
      });
  }

  renderContent() {
    switch (this.state.initialization.state) {
      case RequestState.Loading:
        return <Text style={styles.welcome}>Loading...</Text>;
      case RequestState.Success:
        return (
          <>
            <Text style={styles.welcome}>Welcome to React Native Skygear!</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </>
        );
      case RequestState.Failure:
        return <Text style={styles.welcome}>Error</Text>;
    }
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}
