import React, { useState, useEffect } from "react";
import getDirections from 'react-native-google-maps-directions';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { material, human, iOSColors } from 'react-native-typography';
import { FontAwesome } from '@expo/vector-icons';

const addresses = [
  {
    name: 'suzie',
    address: '24 buttfuck nowhere',
    distance: '4',
  },
  {
    name: 'suzie',
    address: '24 buttfuck nowhere',
    distance: '4'
  },
  {
    name: 'suzie',
    address: 'asdfasdf',
    distance: '4'
  }
]

const getAvailableAddresses = () => {
  return addresses;
}

const handleAddressChange = index => {
  // SEND POST WITH UPDATED ADDRESS
}


const PackageModal = ({name, address, status, isChillerMode}) => {
    const butStyle = StyleSheet.create({
        buttonStyle: {
            color: 'red',
            marginTop: 10,
            backgroundColor: 'blue'
        }
    })

    const viewStyles = StyleSheet.create ({
      centeredView: {
        alignItems: 'center',
        justifyContent: 'center'
      }
    });
    
    const styles = StyleSheet.create({
        yellowTitle: {
          ...human.title3Object,
          color: iOSColors.red,
        }
      });
    handleGetDirections = () => {
        const data = {
           source: {
            latitude: -33.8356372,
            longitude: 18.6947617
          },
          destination: {
            latitude: -33.8600024,
            longitude: 18.697459
          },
          params: [
            {
              key: "travelmode",
              value: "walking"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
          ]
        }
        getDirections(data)
    }
    let button;
    if (status === "In Transit" && isChillerMode) {
      button = <Button
        title="Scan QR"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
      />
      mapButton = <Text></Text>
    }
    else if (status === "In Transit" && !isChillerMode) {
      
      let availAddresses = getAvailableAddresses();
      
      button = 
      <View style={viewStyles.centeredView}>
      <Text style={{fontWeight: 'bold', fontSize: 25}}>Change Location</Text>
      {
        availAddresses.map((l, i) => (
          <ListItem
            style={viewStyles.centeredView}
            color="#2EE0F5"
            key={i}
            title={<Button
              title={l.name}
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              //containerStyle={{alignItems: 'center', justifyContent: 'center'}}
              titleStyle={{ fontWeight: 'bold' }}
            />}
            subtitle={<Text style={{ fontWeight: 'bold'}}>{l.address}</Text>}
            onPress={e => {handleAddressChange(i)}}
          />
        ))
      }
      </View>
    
      
      mapButton = <Text></Text>
    }
    else if (status === "At Chillers" && !isChillerMode) {
        button = <Button
        title="Scan QR"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
      />
        mapButton = <Button
        title="Get Directions"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        onPress={e => handleGetDirections()}
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
      />
    }
    else {
        button = <Text></Text>
        mapButton = <Text></Text>
    }
    
    
    return (
        //TODO: ADD PACKAGE INFO IN PROPS AND DISPLAY PACKAGE INFO IN TEXT
        <SafeAreaView>
          <View style={viewStyles.centeredView}>
            {button}
            {mapButton}
            
            <Text style={styles.yellowTitle}>Weight in Pounds: 25lbs</Text>
            <Text style={styles.yellowTitle}>Dimensions in Inches (LxWxH): 4x4x4</Text>
          </View>
        </SafeAreaView>
    );
}

export default PackageModal;