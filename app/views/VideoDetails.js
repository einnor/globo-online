import React, { Component } from 'react'
import { Text, View, WebView } from 'react-native'

export class VideoDetails extends Component {
  staticnavigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props;
    const tubeId = navigation.getParam('ytubeId', 'NO VIDEO');
    const tubeUrl = `https://www.youtube.com/embed/${tubeId}`;
    return (
      <WebView style={{ marginTop: 20 }} javaScriptEnabled={true} source={{ uril: tubeUrl }} />
    );
  }
}
