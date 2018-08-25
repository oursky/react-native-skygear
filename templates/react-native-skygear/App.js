import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello skygear
        </Text>
      </View>
    );
  }
}

export default App;
