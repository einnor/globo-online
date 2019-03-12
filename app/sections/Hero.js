import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native';

export class Hero extends Component {
  render() {
    return (
      <Image style={styles.heroImage} source={require('./img/hero.jpg')} />
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