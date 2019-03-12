import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  toggleUser = () => {
    const { isLoggedIn } = this.state;
    this.setState({ isLoggedIn: !isLoggedIn });
  }

  render() {
    const { message } = this.props;
    const { isLoggedIn } = this.state;
    const display = isLoggedIn ? 'Sample User' : message
    return (
      <View style={styles.headStyle}>
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
  },
  headStyle: {
    paddingTop: 30,
    paddingRight: 10,
    backgroundColor: '#35605a',
    flex: 1,
  }
});