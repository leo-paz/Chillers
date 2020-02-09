import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import { SafeAreaView } from "react-navigation";

import { FontAwesome } from '@expo/vector-icons';

const baseUrl = 'http://c636a574.ngrok.io';

const FriendsScreen = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
  const handleDataFetch = async () => {
    await fetch(
        `${baseUrl}/getUserData`,
        {
          method: "POST",
          body: JSON.stringify({userId: '01'}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => res.json())
      .then(response => {
        console.log(response.friends);
        setFriends(response.packages[0].possibleDestinations);
      })
      .then(() => {

      })
      .catch(error => console.log(error));
    };
  handleDataFetch();
}, []);
  
  const styles = {
    addIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 150/2,
      backgroundColor: '#000000',
      margin: 20,
      marginTop: 24,
      position: 'absolute',
      bottom: -288
    },
    centeredView: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const removeFriend = (index) => {
    //let friendToRemove = friends[index];
    //REMOVE FRIEND THROUGH API CALL
    // fetch(
      //     `https://url.com/users,
      //     {
      //       method: "POST",
      //       headers: new Headers({
      //         Accept: "application/vnd.github.cloak-preview"
      //       })
      //     }
      //   )
      //     .then(res => res.json())
      //     .then(response => {
      //       setCommitHistory(response.items);
      //       setIsLoading(false);
      //     })
      //     .catch(error => console.log(error));
  }

  const addFriend = () => {
     // fetch(
      //     `https://url.com/users,
      //     {
      //       method: "GET",
      //       headers: new Headers({
      //         Accept: "application/vnd.github.cloak-preview"
      //       })
      //     }
      //   )
      //     .then(res => res.json())
      //     .then(response => {
      //       setCommitHistory(response.items);
      //       setIsLoading(false);
      //     })
      //     .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={{ marginTop: 24}}>
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
          <FontAwesome color='#48E659' name="plus" size={45} onPress={e => addFriend()}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;