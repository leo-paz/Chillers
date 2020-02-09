import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity, SafeAreaView } from "react-native";

const SignIn = ({ navigation }) => {
  const {navigate} = navigation;
  return (
    <SafeAreaView style={{paddingTop: 50}}>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={ () => navigate("AppFlow")} />
    </SafeAreaView>
  );
};

export default SignIn;