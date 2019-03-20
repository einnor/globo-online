import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';

import { QuizData } from '../data/QuizQuestions';
import { Question } from '../sections/Question'

export default class Quiz extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      questLoaded: false,
      totalScore: 100,
      completedQuiz: false,
    };
  }

  componentDidMount() {
    const numQuestions = Array.from(QuizData.questions).length;
    this.setState({ questList: Array.from(QuizData.questions), questLoaded: true, numberOfQuestions: numQuestions, incorrect: 0, questionAnswered: 0 });
  }

  updateScore = (penalty) => {
    const { totalScore, incorrect, numberOfQuestions, questionAnswered } = this.state;
    const tempScore = totalScore;
    const missed = incorrect;
    const questionsTotal = numberOfQuestions;
    const questionsDone = questionAnswered;

    const newScore = tempScore - penalty;
    const totalAnswered = questionsDone + 1;
    const totalMissed = penalty ? missed + 1 : missed;

    this.setState({ totalScore: newScore, incorrect: totalMissed, questionAnswered: totalAnswered });

    if (totalAnswered === questionsTotal) {
      this.setState({ completedQuiz: true });
    }
  }

  finishQuiz = () => {
    const { totalScore, incorrect, numberOfQuestions } = this.state;
    const { navigation } = this.props;
    navigation.navigate('FinishRT', { score: totalScore, missed: incorrect, questions: numberOfQuestions });
  }

  render() {
    const { questLoaded, questList, totalScore, completedQuiz } = this.state;
    return (
      <View style={StyleSheet.container}>
        {
          questLoaded && (
            <FlatList
              data={questList}
              renderItem={({ item }) => (
                <Question
                  question={item.question}
                  answer1={item.answer1}
                  answer2={item.answer2}
                  answer3={item.answer3}
                  answer4={item.answer4}
                  correctAnswer={item.correctAnswer}
                  scoreUpdate={this.updateScore}
                />
              )}
            />
          )
        }
        {
          !completedQuiz && (
            <TouchableHighlight style={styles.disabled}>
              <Text>Answer all the questions</Text>
            </TouchableHighlight>
          )
        }
        {
          completedQuiz && (
            <TouchableHighlight style={styles.enabled} onPress={this.finishQuiz}>
              <Text>Answer all the questions</Text>
            </TouchableHighlight>
          )
        }
        {
          !questLoaded && (
            <Text>LOADING...</Text>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  disabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    height: '10%',
  },
  enabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90ee90',
    height: '10%',
  },
});
