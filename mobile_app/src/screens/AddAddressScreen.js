import React, { useState, Component } from "react";
import { SafeAreaView, Text} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

import {ADD_ADDRESS} from '../actions/index.actions'

class AddAdressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressName: "",
      street: "",
      city: "",
      province: "",
      country: "Canada",
      postalCode: ""
    };
  }

  addAddress = () => {
    const newAddress = {
      addressName: this.state.addressName,
      street: this.state.street,
      city: this.state.city,
      province: this.state.province,
      country: this.state.country,
      postalCode: this.state.postalCode
    };
    this.props.dispatch({ type: ADD_ADDRESS, payload: newAddress });

    console.log('Called');
    this.props.navigation.pop();
    // this.props.navigation.navigate("Dashboard");
  };
  render() {
    return (
      <SafeAreaView>
        <Text>Edit Adddress</Text>
        <Input
          placeholder="Name"
          value={this.state.addressName}
          onChangeText={text => this.setState({ addressName: text })}
        />
        <Input
          placeholder="Street"
          value={this.state.street}
          onChangeText={text => this.setState({ street: text })}
        />

        <Input
          placeholder="City"
          value={this.state.city}
          onChangeText={text => this.setState({ city: text })}
        />
        <Input
          placeholder="Province"
          value={this.state.text}
          onChangeText={text => this.setState({ provice: text })}
        />
        <Input
          placeholder="Country"
          value={this.state.country}
          onChangeText={text => this.setState({ country: text })}
        />

        <Input
          placeholder="Postal Code"
          value={this.state.postalCode}
          onChangeText={text => this.setState({ postalCode: text })}
        />

        <Button title="Solid Button" onPress={this.addAddress}/>
      </SafeAreaView>
    );
  }
}

const mapDipatchToProps = dispatch => ({
  dispatch
});

export default connect(mapDipatchToProps)(AddAdressScreen);
