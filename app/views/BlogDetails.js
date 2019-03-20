import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

export class BlogDetails extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      postLoaded: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const blogId = navigation.getParam('blogId', 'No blog');
    return fetch(`https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts/${blogId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          postLoaded: true,
          postTitle: responseJson.title,
          postImage: responseJson.featured_image,
          postContent: responseJson.content,
          postID: responseJson.ID,
        });
      })
      .catch((error) => console.log(error));
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('BlogRT');
  }

  render() {
    const { postLoaded, postTitle, postImage, postContent, postID } = this.state;

    const blogTagStyles = {
      img: { display: 'none' },
    };

    const blogClassStyles = {
      blTitle: { marginLeft: 'auto', marginRight: 'auto' },
      blContent: { marginLeft: 10, marginRight: 10 },
      blBack: { marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20 },
    };

    const postDetails = `
      <div class="blTitle">
        <h1>${postTitle}</h1>
      </div>

      <div class="blContent">
        ${postContent}
      </div>

      <div class="blBack">
      <a href=${postID} style="textDecorationLine: none; color: #000000; textAlign: center">
        <h2>GO BACK</h2>
      </a>
      </div>
    `;

    return (
      <View style={{ paddingTop: 30 }}>
        {
          postLoaded && (
            <ScrollView>
              <Image style={{ width: '100%', height: 200 }} source={{ uri: postImage }} />
              <HTML html={postDetails} blogTagStyles={blogTagStyles} classesStyles={blogClassStyles} onLinkPress={this.goBack} />
            </ScrollView>
          )
        }
        {
          !postLoaded && (
            <View style={{ paddingTop: 20, alignItems: 'center' }}>
              <Text>LOADING...</Text>
            </View>
          )
        }
      </View>
    );
  }
}
