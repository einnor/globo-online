import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../sections/Header';

export class Home extends Component {
  render() {
    return (
      <View>
        <Header message="Press to Login" />
        <Text>This will be the Home page</Text>
      </View>
    );
  }
}