import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, AsyncStorage } from 'react-native'

export class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  cancelLogin = () => {
    const { navigation } = this.props;
    Alert.alert('Login cancelled');
    navigation.navigate('HomeRT');
  }

  loginUser = () => {
    const { navigation } = this.props;
    const { username, password } = this.state;
    if (!username) {
      Alert.alert('Please enter a username');
    } else if (!password) {
      Alert.alert('Please enter a password');
    } else {
      AsyncStorage.getItem('userLoggedIn', (err, result) => {
        if ( result !== 'none') {
          Alert.alert('Some is already logged in');
          navigation.navigate('HomeRT');
        } else {
          AsyncStorage.getItem(username, (err, result) => {
            if (result !== null) {
              if (result !== password) {
                Alert.alert('Incorrect password');
              } else {
                AsyncStorage.setItem('userLoggedIn', username, (err, result) => {
                  Alert.alert(`User ${username} is already logged in`);
                  navigation.navigate('HomeRT');
                });
              }
            } else {
              Alert.alert(`No account exists for user ${username}`);
            }
          });
        }
      });
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Register Account</Text>

        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ username: text })} value={username} />
        <Text style={styles.labels}>Enter Username</Text>

        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({ password: text })} value={password} secureTextEntry={true} />
        <Text style={styles.labels}>Enter Password</Text>

        <TouchableHighlight onPress={this.loginUser} underlayColor='#31e981'>
          <Text style={styles.buttons}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.cancelLogin} underlayColor='#31e981'>
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
