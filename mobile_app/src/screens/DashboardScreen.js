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

const getPackageStatusColour = status => {
  if (status === "Delivered") {
    return "#48E659";
  } else if (status === "At Chillers") {
    return "#EFED59";
  } else if (status === "In Transit") {
    return "#EF5959";
  }
  else if (status === 'At PackageHub') {
    return '#EFED59';
  }
  else if (status === 'In Transit'){
    return '#EF5959';
  }
}



const UserDashboardScreen = (props) => {
  const [isVisible, setVisibility] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isChillerMode, setChillerMode] = useState(false);

  const [packages, setPackages] = useState([]);
  useEffect(() => {
    if (!isChillerMode) {
      fetch(`https://randomuser.me/api/user/${props.userId}/packages`)
          .then(results => results.json())
          .then(data => {
            setPackages(data);
          });
    }
  })
  const list = [
    {
      name: "Amy Farha",
      address: "46 Coolspring Crescent",
      status: "Delivered"
    },
    {
      name: "Chris Jackson",
      address: "3060 Uplands Drive",
      status: "In Transit"
    },
    {
      name: 'Moe Jackson',
      address: '1 Hines Road',
      status: 'At PackageHub'
    },
    {
      name: "Ian Burner",
      address: "23 Sussex Drive",
      status: "Delivered"
    },
    {
      name: "Amy Farha",
      address: "46 Coolspring Crescent",
      status: "Delivered"
    },
    {
      name: "Chris Jackson",
      address: "3060 Uplands Drive",
      status: "In Transit"
    },
    {
      name: 'Moe Jackson',
      address: '1 Hines Road',
      status: 'At PackageHub'
    },
    {
      name: "Ian Burner",
      address: "23 Sussex Drive",
      status: "Delivered"
    }
  ];

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
  

  

  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
      <ToggleSwitch
        isOn={isChillerMode}
        onColor="#004A8E"
        offColor="#D3200D"
        label="In Chiller Mode"
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
          address={list[selectedIdx].address} //{list[selectedIdx].address}
          name = {list[selectedIdx].name} //{list[selectedIdx].name}
          status = {list[selectedIdx].status} //{list[selectedIdx].status}
          isChillerMode = {isChillerMode}
        />
      </Overlay> 
      {
        list.map((l, i) => (
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
