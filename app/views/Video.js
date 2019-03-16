import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

export class Video extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      listLoaded: false,
    };
  }
  componentDidMount() {
    return fetch('https://www/googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyD_1odp_kE4NSNDQNpewIzLta6y4rPFpZw')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          listLoaded: true,
          videoList: Array.from(responseJson.items),
        })
      })
      .catch((error) => console.log(error));
  }
}