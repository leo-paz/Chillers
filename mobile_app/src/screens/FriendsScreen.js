import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import { SafeAreaView } from "react-navigation";

import { FontAwesome } from '@expo/vector-icons';

const FriendsScreen = () => {
  const friends = [
    {
      name: 'Amy Farha',
      address: '46 Coolspring Crescent'
    },
    {
      name: 'Chris Jackson',
      address: '3060 Uplands Drive'
    },
    {
      name: 'Moe Jackson',
      address: '1 Hines Road'
    }
  ]
  const styles = {
    addIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 150/2,
      backgroundColor: '#000000',
      margin: 20
    },
    centeredView: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const removeFriend = (index) => {
    //let friendToRemove = friends[index];
    //REMOVE FRIEND THROUGH API CALL
  }

  return (
    <SafeAreaView>
      {
        friends.map((friend, i) => (
          <ListItem
            color="#2EE0F5"
            key={i}
            title={friend.name}
            subtitle={friend.address}
            bottomDivider
            topDivider
            rightIcon={<FontAwesome color='#EF5959' name="remove" size={32} onPress={e => removeFriend(i)}/>}
          />
        ))
      }
      <View style={styles.centeredView}>
        <View style={styles.addIcon}>
          <FontAwesome color='#48E659' name="plus" size={45}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;