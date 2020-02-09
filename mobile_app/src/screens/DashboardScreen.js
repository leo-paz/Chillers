import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { ListItem, Overlay } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import PackageModal from "./PackageModal";
import ToggleSwitch from "toggle-switch-react-native";
import { fetchUpdateAsync } from "expo/build/Updates/Updates";

const baseUrl = 'http://c636a574.ngrok.io'; 

const getPackageStatusColour = status => {
  if (status === "Delivered") {
    return "#48E659";
  } else if (status === "Transit") {
    return "#EF5959";
  }
  else if (status === 'PackageHub') {
    return '#EFED59';
  }
}



const UserDashboardScreen = (props) => {
  const [isVisible, setVisibility] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isChillerMode, setChillerMode] = useState(false);

  const [packages, setPackages] = useState([]);
  
  
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
          setPackages(response.packages);
        })
        .catch(error => console.log(error));
      };
    handleDataFetch();
  }, []);
    
  
  const styles = {
    addIcon: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,
      borderRadius: 150 / 2,
      backgroundColor: "#000000",
      margin: 20
    },
    centeredView: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10
    }
  }
  
  const getAddress = (idx) => {
    if (packages.length != 0 && idx != null) {
      return packages[idx].address;
    }
    else {
      return null;
    }
  }
  const getName = (idx) => {
    if (packages.length != 0 && idx != null) {
      return packages[idx].name;
    }
    else {
      return null;
    }
  }
  const getStatus = (idx) => {
    if (packages.length != 0 && idx != null) {
      return packages[idx].status;
    }
    else {
      return null;
    }
  }

  return (
    <SafeAreaView style={{marginTop: 24}}>
      <View style={styles.centeredView}>
      <ToggleSwitch
        isOn={isChillerMode}
        onColor="#004A8E"
        offColor="#D3200D"
        label="Show My PackageHub"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="large"
        onToggle={e => setChillerMode(!isChillerMode)}
      />
      </View>
      <ScrollView>

      <Overlay
        //width={Math.round(Dimensions.get('window').height) - 100}
        //height={Math.round(Dimensions.get('window').width) - 100}
        isVisible={isVisible}
        onBackdropPress={e => setVisibility(false)}>
        <PackageModal 
          address={getAddress(selectedIdx)} //{list[selectedIdx].address}
          name = {getName(selectedIdx)} //{list[selectedIdx].name}
          status = {getStatus(selectedIdx)} //{list[selectedIdx].status}
          isChillerMode = {isChillerMode}
        />
      </Overlay> 
      {
        packages.map((l, i) => (
          <ListItem
            color="#2EE0F5"
            key={i}
            title={l.name}
            subtitle={l.address}
            bottomDivider
            topDivider
            rightSubtitle={l.status}
            rightIcon={<FontAwesome name="circle" color={getPackageStatusColour(l.status)} size={32}/>}
            onLongPress={e => {setVisibility(true); setSelectedIdx(i);}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDashboardScreen;
