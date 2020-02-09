import React from "react";
import { StyleSheet } from "react-native";

// import { initStore } from "./redux/store";
import { initStore } from "./src/store";
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './src/reducers/rootReducer';
import axiosMiddleware from 'redux-axios-middleware';

import axios from 'axios';


import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { FontAwesome, Feather } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "./src/screens/SignInScreen";
import UserDashboardScreen from "./src/screens/DashboardScreen";
import SettingScreen from "./src/screens/SettingScreen";
import FriendsScreen from "./src/screens/FriendsScreen";
import AddAddressScreen from "./src/screens/AddAddressScreen";

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
    SettingStack: {
      screen: createStackNavigator({
        Setting: SettingScreen,
        AddAdress: AddAddressScreen
      }),
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
// const store = initStore();
const mapStateToProps = (state) => ({
  state
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));


export default function() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
