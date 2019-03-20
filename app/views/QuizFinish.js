import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export class QuizFinish extends Component {
  static navigationOptions = {
    header: null,
  }

  exitQuiz = () => {
    const { navigation } = this.props;
    navigation.navigate('HomeRT');
  }

  render() {
    const { navigation } = this.props;
    const userScore = navigation.getParam('score', 'Error - No score returned');
    const questionsMissed = navigation.getParam('missed', 'Error - No missed questions');
    const totalQuestions = navigation.getParam('questions', 'Error - No questions returned');

    return (
      <View style={styles.container}>
        <Text>Your quiz score was {userScore}</Text>
        <Text>You missed on {questionsMissed} out of {totalQuestions}</Text>

        <TouchableHighlight onPress={this.exitQuiz} style={styles.button}>
          <Text>Finish Quiz</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
});
