import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from "react-native";

const getFakepackages = () => {
  return [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "six" }
  ];
};

const UserDashboardScreen = () => {
  packages = getFakepackages();
  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <View style={styles.container}>
        <FlatList
          data={packages}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default UserDashboardScreen;
