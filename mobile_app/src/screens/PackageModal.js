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
import { Button } from 'react-native-elements';
import { material, human, iOSColors } from 'react-native-typography'

const PackageModal = ({name, address, status}) => {
    const butStyle = StyleSheet.create( {
        buttonStyle: {
            color: 'red',
            marginTop: 10,
            backgroundColor: 'blue'
        }
    })
    
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
    if (status === "At Chillers") {
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
    const viewStyles = {
      centeredView: {
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    
    return (
        //TODO: ADD PACKAGE INFO IN PROPS AND DISPLAY PACKAGE INFO IN TEXT
        <SafeAreaView>
          <View style={viewStyles.centeredView}>
            {mapButton}
            {button}
            <Text style={styles.yellowTitle}>Weight in Pounds: 25lbs</Text>
            <Text style={styles.yellowTitle}>Dimensions in Inches (LxWxH): 4x4x4</Text>
          </View>
        </SafeAreaView>
    );
}

export default PackageModal;