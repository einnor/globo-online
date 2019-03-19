import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';
import { SatckNavigator } from 'react-navigation';

import { Header } from '../sections/Header';

export class Contact extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      msg: 'Enter Message',
      name: 'Enter Name',
      email: 'Enter your E-mail Address',
    };
  }

  clearFileds = () => this.setState({ name: '', msg: '', email: '' });

  sendMessage = () => {
    const { navigation } = this.props;
    const { name, msg } = this.state;
    Alert.alert(name, msg);
    navigation.goBack();
  }

  render() {
    const { name, msg, email } = this.state;
    return (
      <View style={styles.container}>
        <Header navigate={navigate} message="Press to Login" />
        <Text style={styles.heading}>The contact form will go here</Text>
        
        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ name: text })} value={name} />
        <TextInput style={styles.multiInput} onChangeText={(text) => this.setState({ msg: text })} value={msg} multiline={true} numberOfLines={4} />
        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} value={email} />
        <TouchableHighlight onPress={this.sendMessage} underlayColor="#31e981">
          <Text style={styles.buttons}>Send Message</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.clearFileds} underlayColor="#31e981">
          <Text style={styles.buttons}>Reset Form</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
  },
  heading: {
    fontSize: 16,
    flex: 1,
  },
  inputs: {
    flex: 1,
    width: '80%',
    padding: 10,
  },
  multiInput: {
    flex: 2,
    width: '90%',
    paddingTop: 20,
  },
  buttons: {
    marginTop: 15,
    fontSize: 16,
  }
});