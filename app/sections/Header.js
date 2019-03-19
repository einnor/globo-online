import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, AsyncStorage, Alert } from 'react-native';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loggedUser: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userLoggedIn', (err, result) => {
      if (result === 'none') {

      } else if (result === null) {
        AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {});
      } else {
        this.setState({ isLoggedIn: true, loggedUser: result });
      }
    });
  }

  toggleUser = () => {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
        this.setState({ isLoggedIn: false, loggedUser: false });
        Alert.alert('User logged out');
      });
    }
  }

  render() {
    const { message } = this.props;
    const { isLoggedIn, loggedUser } = this.state;
    const display = isLoggedIn ? loggedUser : message
    return (
      <View style={styles.headStyle}>
        <Image style={styles.logoStyle} source={require('./img/logo.png')} />
        <Text onPress={this.toggleUser} style={styles.headText}>{display}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 20,
    flex: 1,
  },
  headStyle: {
    paddingTop: 30,
    paddingRight: 10,
    backgroundColor: '#35605a',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
  }
});