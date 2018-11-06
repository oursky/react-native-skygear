import { createStackNavigator } from "react-navigation";
import { HomeScreen, DetailsScreen, CounterScreen } from "./Screen";

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Counter: {
      screen: CounterScreen,
    },
  },
  {
    initialRouteName: "Home",
  }
);
