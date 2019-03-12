import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../sections/Header';

export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header message="Press to Login" />
        <Text style={{ flex: 8 }}>This will be the Home page</Text>
        <Text style={{ flex: 6 }}>This will be the Home page</Text>
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
  container: {
    flex: 1,
  }
});