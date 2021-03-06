import React from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { StackNavigator } from 'react-navigation';

import { Contact } from './app/views/Contact';
import { Home } from './app/views/Home';
import { Video } from './app/views/Video';
import { VideoDetails } from './app/views/VideoDetails';
import { Register } from './app/views/Register';
import { Login } from './app/views/Login';
import { Quiz } from './app/views/Quiz';
import { QuizFinish } from './app/views/QuizFinish';
import { Blog } from './app/views/Blog';
import { BlogDetails } from './app/views/BlogDetails';

const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home,
  },
  ContactRT: {
    screen: Contact,
  },
  LessonsRT: {
    screen: Video,
  },
  VideoDetailsRT: {
    screen: VideoDetails,
  },
  RegisterRT: {
    screen: Register,
  },
  LoginRT: {
    screen: Login,
  },
  QuizRT: {
    screen: Quiz,
  },
  FinishRT: {
    screen: QuizFinish,
  },
  BlogRT: {
    screen: Blog,
  },
  BlogDetailsRT: {
    screen: BlogDetails,
  },
}, {
  initialRouteName: 'HomeRT',
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <MyRoutes />
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
