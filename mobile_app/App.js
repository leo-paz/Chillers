import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "./src/screens/SignInScreen";
import UserDashboardScreen from "./src/screens/DashboardScreen";
import SettingScreen from "./src/screens/SettingScreen";
import FriendsScreen from "./src/screens/FriendsScreen";

const AppFlow = createBottomTabNavigator({
  Dashboard: UserDashboardScreen,
  Setting: SettingScreen,
  Friends: FriendsScreen
});

const SignInFlow = createSwitchNavigator({
  SigneIn: SignInScreen,
  AppFlow: AppFlow 
});

const App = createAppContainer(SignInFlow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function() {
  return <App />;
}
