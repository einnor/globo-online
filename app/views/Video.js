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
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyD_1odp_kE4NSNDQNpewIzLta6y4rPFpZw')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          listLoaded: true,
          videoList: Array.from(responseJson.items),
        })
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { listLoaded, videoList } = this.state;
    console.log(videoList);
    return(
      <View>
        {
          listLoaded ? (
            <View style={{ paddingTop: 30 }}>
              <FlatList
                data={videoList}
                renderItem={({ item }) => (
                  <TubeItem navigate={navigate} id={item.id.videoId} title={item.snippet.title} imageSrc={item.snippet.thumbnails.high.url} />
                )}
              />
            </View>
          ) : (
            <View style={{ paddingTop: 30 }}>
              <Text>LOADING...</Text>
            </View>
          )
        }
      </View>
    );
  }
}

export class TubeItem extends Component {
  onPress = () => {
    const { id, navigate } = this.props;
    navigate('VideoDetailsRT', { ytubeId: id });
  }

  render() {
    const { imageSrc, title } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={{ paddingTop: 20, alignItems: 'center' }}>
          <Image style={{ width: '100%', height: 200 }} source={{ uri: imageSrc }} />
          <Text>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}