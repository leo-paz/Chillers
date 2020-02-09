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
    address: '24 Hazeldean Road',
    distance: '4',
  },
  {
    name: 'john',
    address: '24 Sussex Drive',
    distance: '4'
  },
  {
    name: 'buck',
    address: '46 Coolspring Crescent',
    distance: '4'
  }
]

const baseUrl = 'http://c636a574.ngrok.io';



const getAvailableAddresses = () => {
  
}

const handleAddressChange = index => {
  // SEND POST WITH UPDATED ADDRESS
}


const PackageModal = ({name, address, status, isChillerMode}) => {
  const [destinations, setDestinations] = useState([]);
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
          console.log(response.packages[0].possibleDestinations[0].street);
          setDestinations(response.packages[0].possibleDestinations);
        })
        .catch(error => console.log(error));
      };
    handleDataFetch();
  }, []);

    const viewStyles = StyleSheet.create ({
      centeredView: {
        alignItems: 'center',
        justifyContent: 'center',

      }
    });
    
    const styles = StyleSheet.create({
        yellowTitle: {
          ...human.title3Object,
          color: iOSColors.black,
          textAlign: 'center',
          justifyContent: 'center',
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
    let mapButton;
    if (status === "Transit" && isChillerMode) {
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
    else if (status === "Transit" && !isChillerMode) {
      
      let availAddresses = getAvailableAddresses();
      
      button = 
      <View style={viewStyles.centeredView}>
      <Text style={{fontWeight: 'bold', fontSize: 25}}>Change Location</Text>
      {
        destinations.map((l, i) => (
          <ListItem
            style={viewStyles.centeredView}
            color="#2EE0F5"
            key={i}
            title={<Button
              title={l.street}
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              //containerStyle={{alignItems: 'center', justifyContent: 'center'}}
              titleStyle={{ fontWeight: 'bold' }}
            />}
            subtitle={<Text style={{ fontWeight: 'bold', textAlign: 'center'}}>{l.name}</Text>}
            onPress={e => {handleAddressChange(i)}}
          />
        ))
      }
      </View>
    
      
      mapButton = <Text></Text>
    }
    else if (status === "PackageHub" && !isChillerMode) {
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