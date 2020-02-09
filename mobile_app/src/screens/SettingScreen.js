import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Divider, Text, h1, Header, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import ToggleSwitch from "toggle-switch-react-native";

const exampleAddress = () => [
  {
    addressName: "Home",
    isDefault: true,
    street: "310 Sandhill",
    city: "Kanata",
    province: "Ontario",
    country: "Canada",
    postalCode: "A1b 0J1"
  }
];

// const SettingScreen = ({ navigation, addresses, isPackageHub }) =>
class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvialable: false,
      isChillerMode: false
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("didFocus", payload => {
      this.forceUpdate();
    });
  }

  render() {
    console.log("new render");
    // console.log(this.props.addresses);
    return (
      <SafeAreaView style={{marginTop: 10}}>
        <Text style={{fontWeight: "900" }} h4>Address</Text>
        <Divider style={{ backgroundColor: "blue" }} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.addresses}
          renderItem={({ item }) => (
            <ListItem
              title={item.addressName}
              subtitle={item.street}
              bottomDivider
              chevron
              onPress={() => console.log("pressed")}
            />
          )}
        />
        <Button
          title="Add Address"
          onPress={() => this.props.navigation.navigate("AddAdress")}
        />
        <Divider style={{ backgroundColor: 'blue', margin: 10 }} />
        <View>
          <ToggleSwitch
            isOn={this.state.isAvialable}
            onColor="#004A8E"
            offColor="#D3200D"
            label="Package Hub"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={isOn =>
              this.setState({ isAvialable: !this.state.isAvialable })
            }
          />
        </View>
        <View >
          <ToggleSwitch
            isOn={this.state.isChillerMode}
            onColor="#004A8E"
            offColor="#D3200D"
            label="In Chiller Mode"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={e => this.setState({isChillerMode: !this.state.isChillerMode})}
          />
        </View>
      </SafeAreaView>
    );
  }
}

styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});

const mapStateToProps = state => {
  if (state === null || typeof state === "undefined") {
    console.log("state is null");
  }

  const { addresses, isPackageHub } = state.userReducer;
  return {
    addresses: addresses,
    isPackageHub: isPackageHub
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

// export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
export default connect(mapStateToProps)(SettingScreen);
