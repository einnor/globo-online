import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, AsyncStorage } from 'react-native'

export class Register extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
    };
  }

  cancelRegister = () => {
    const { navigation } = this.props;
    Alert.alert('Registration cancelled');
    navigation.navigate('HomeRT');
  }

  registerAccount = () => {
    const { navigation } = this.props;
    const { username, password, passwordConfirm } = this.state;
    if (!username) {
      Alert.alert('Please enter a username');
    } else if (password !== passwordConfirm) {
      Alert.alert('Passwords do not match');
    } else {
      AsyncStorage.getItem(username, (err, result) => {
        if ( result !== null) {
          Alert.alert(`Username ${username} already exists`);
        } else {
          AsyncStorage.setItem(username, password, (err, result) => {
            Alert.alert(`Successfully created account ${username}`);
            navigation.navigate('HomeRT');
          });
        }
      });
    }
  }

  render() {
    const { username, password, passwordConfirm } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Register Account</Text>

        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ username: text })} value={username} />
        <Text style={styles.labels}>Enter Username</Text>

        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ password: text })} value={password} secureTextEntry={true} />
        <Text style={styles.labels}>Enter Password</Text>

        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ passwordConfirm: text })} value={passwordConfirm} secureTextEntry={true} />
        <Text style={styles.labels}>Enter Confirmation Password</Text>

        <TouchableHighlight onPress={this.registerAccount} underlayColor='#31e981'>
          <Text style={styles.buttons}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.cancelRegister} underlayColor='#31e981'>
          <Text style={styles.buttons}>Cancel</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
    paddingTop: '10%',
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
  buttons: {
    marginTop: 15,
    fontSize: 16,
  },
  labels: {
    paddingBottom: 10,
  },
});
