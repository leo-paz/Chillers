import React from "react";
import { StyleSheet } from "react-native";

// import { initStore } from "./redux/store";
import { initStore } from "./src/store";
import { Provider } from "react-redux";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { FontAwesome, Feather } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "./src/screens/SignInScreen";
import UserDashboardScreen from "./src/screens/DashboardScreen";
import SettingScreen from "./src/screens/SettingScreen";
import FriendsScreen from "./src/screens/FriendsScreen";

import { NavigationContainer } from "react-navigation";

const AppFlow = createBottomTabNavigator(
  {
    Friends: {
      screen: FriendsScreen,
      navigationOptions: {
        tabBarLabel: "Friends",
        tabBarIcon: ({ tintColor }) => <Feather name="user" size={30} />
      }
    },
    Dashboard: {
      screen: UserDashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Feather name="mail" size={30} />
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => <FontAwesome name="gear" size={30} />
      }
    }
  },
  {
    initialRouteName: "Dashboard"
  }
);

const SignInFlow = createSwitchNavigator({
  // SigneIn: SignInScreen,
  AppFlow: AppFlow
});

const App = createAppContainer(SignInFlow);
const store = initStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
