import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity, SafeAreaView } from "react-native";

const SignIn = ({ navigation }) => {
  const {navigate} = navigation;
  return (
    <SafeAreaView>
      <Text>Sign In Screen</Text>
      <Button title="SignIn" onPress={ () => navigate("AppFlow")} />
    </SafeAreaView>
  );
};

export default SignIn;