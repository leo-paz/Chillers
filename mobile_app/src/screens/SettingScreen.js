import React, { useState, useEffect } from "react";
import { Divider, Text, h1, Header } from "react-native-elements";
import { View, SafeAreaView, TouchableOpacity } from "react-native";

const SettingScreen = () => {
  return (
    <SafeAreaView>
      <Text h1>User Settings</Text>
      <Divider style={{ backgroundColor: "blue" }} />
      <Text>Addresses</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;
