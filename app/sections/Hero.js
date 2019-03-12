import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native';

export class Hero extends Component {
  render() {
    return (
      <Image style={styles.heroImage} source={require('./img/hero.jpeg')} />
    );
  }
}

const styles = StyleSheet.create({
  heroImage: {
    flex: 8,
    width: undefined,
    height: undefined,
  }
});