import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../sections/Header';
import { Hero } from '../sections/Hero';

export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header message="Press to Login" />
        <Hero />
        <Text style={{ flex: 6 }}>This will be the Home page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});