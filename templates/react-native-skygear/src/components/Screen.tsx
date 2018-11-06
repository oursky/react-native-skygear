import * as React from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";

import { AppText, LocalizedText } from "./Text";

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
