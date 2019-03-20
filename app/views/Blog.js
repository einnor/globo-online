import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import HTML from 'react-native-render-html';

export class Blog extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      blogLoaded: false,
    };
  }

  componentDidMount() {
    return fetch('https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ blogLoaded: true, blogList: Array.from(responseJson.posts) });
      })
      .catch((error) => console.log(error));
  }

  chooseBlog = (blogID) => {
    const { navigation } = this.props;
    navigation.navigate('BlogDetailsRT', { blogId: blogID });
  }

  render() {
    const { blogLoaded, blogList } = this.state;
    return (
      <View>
        {
          blogLoaded && (
            <View style={{ paddingTop: 40 }}>
              <FlatList
                data={blogList}
                keyExtractor={(item, index) => item.ID.toString()}
                renderItem={({ item }) => (
                  <BlogItem
                    id={item.ID}
                    title={item.title}
                    imageSrc={item.featured_image}
                    excerpt={item.excerpt}
                    choosePost={() => this.chooseBlog(item.ID)}
                  />
                )}
              />
            </View>
          )
        }
        {
          !blogLoaded && (
            <View style={{ paddingTop: 30 }}>
              <Text>LOADING...</Text>
            </View>
          )
        }
      </View>
    )
  }
}

export class BlogItem extends Component {
  blogChoice = () => {
    const { choosePost, id } = this.props;
    choosePost(id);
  }
  render() {
    const { id, imageSrc, title, excerpt } = this.props;
    const blogItems = `
    <a href=${id} style="textDecorationLine: none; color: #000000; textAlign: center">
      <img src=${imageSrc} />
      <h1>${title}</h1>
      ${excerpt}
    </a>
    `;
    return (
      <View style={{ borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle: 'solid' }}>
        <HTML html={blogItems} onLinkPress={() => this.blogChoice()}></HTML>
      </View>
    )
  }
}

