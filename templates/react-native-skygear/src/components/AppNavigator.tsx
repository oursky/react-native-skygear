import { createStackNavigator } from "react-navigation";
import { HomeScreen, DetailsScreen } from "./Screen";

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: "Home",
  }
);
