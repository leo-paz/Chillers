import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "./src/screens/SignInScreen";

const SignInFlow = createSwitchNavigator({
  SignedIn: SignInScreen
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
