import * as React from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";

import {
  IncrementCountAction,
  DecrementCountAction,
  incrementAction,
  decrementAction,
  changeCountAction,
} from "../actions/counterAction";

import { AppText, LocalizedText } from "./Text";
import { connect } from "react-redux";
import { State } from "../reducers";
import { bindActionCreators } from "redux";
import { Dispatch, ThunkAction } from "../store";

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
  navigationButton: {
    marginTop: 20,
  },
});

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

type HomeScreenProps = NavigationScreenProps;

export class HomeScreen extends React.PureComponent<HomeScreenProps> {
  static navigationOptions = {
    title: "Home",
  };

  onPressGotoDetailsScreenButton = () => {
    this.props.navigation.navigate("Details");
  };

  onPressGotoCounterScreenButton = () => {
    this.props.navigation.navigate("Counter");
  };

  render() {
    return (
      <View style={styles.container}>
        <AppText>Home Screen</AppText>
        <LocalizedText style={styles.welcome} messageID="app.welcome" />
        <LocalizedText
          style={styles.instructions}
          messageID="app.get_started"
        />
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressGotoDetailsScreenButton}
        >
          <AppText>Go to Details Screen</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressGotoCounterScreenButton}
        >
          <AppText>Go to Counter Screen</AppText>
        </TouchableOpacity>
      </View>
    );
  }
}

type DetailsScreenProps = NavigationScreenProps;

export class DetailsScreen extends React.PureComponent<DetailsScreenProps> {
  static navigationOptions = {
    title: "Details",
  };

  onPressBackButton = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <AppText>Details Screen</AppText>
        <AppText style={styles.instructions}>{instructions}</AppText>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressBackButton}
        >
          <AppText>Back</AppText>
        </TouchableOpacity>
      </View>
    );
  }
}

interface CounterScreenMapProps {
  count: number;
  increment: (count: number) => IncrementCountAction;
  decrement: (count: number) => DecrementCountAction;
  changeCount: (count: number) => ThunkAction<Promise<number>>;
}
type CounterScreenProps = NavigationScreenProps & CounterScreenMapProps;

class _CounterScreen extends React.PureComponent<CounterScreenProps> {
  static navigationOptions = {
    title: "Counter",
  };

  onPressBackButton = () => {
    this.props.navigation.pop();
  };

  onPressIncrementButton = () => {
    this.props.increment(1);
  };

  onPressDecrementButton = () => {
    this.props.decrement(1);
  };

  onPressChangeCountButton = () => {
    this.props.changeCount(this.props.count);
  };

  render() {
    return (
      <View style={styles.container}>
        <AppText>Counter Screen</AppText>
        <AppText>Current count: {this.props.count}</AppText>
        <TouchableOpacity onPress={this.onPressIncrementButton}>
          <AppText>Increment 1</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressDecrementButton}>
          <AppText>Decrement 1</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressChangeCountButton}>
          <AppText>Change count</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressBackButton}
        >
          <AppText>Back</AppText>
        </TouchableOpacity>
      </View>
    );
  }
}

export const CounterScreen = connect(
  (state: State) => ({
    count: state.counter.count,
  }),
  (dispatch: Dispatch) => ({
    increment: bindActionCreators(incrementAction, dispatch),
    decrement: bindActionCreators(decrementAction, dispatch),
    changeCount: bindActionCreators(changeCountAction, dispatch),
  })
)(_CounterScreen);
