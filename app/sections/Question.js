import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export class Question extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      correct: false
    };
  }

  chooseAnswer = (answer) => {
    const { correctAnswer, scoreUpdate } = this.props;
    const worth = 25;
    if (answer === correctAnswer) {
      this.setState({
        selected: true,
        correct: true,
      });
      scoreUpdate(0);
    } else {
      this.setState({
        selected: true,
      });
      scoreUpdate(worth);
    }
  }
  render() {
    const { question, answer1, answer2, answer3, answer4, correctAnswer, key } = this.props;
    const { selected, correct } = this.state;
    return (
      <View style={StyleSheet.container}>
        {
          !selected && (
            <View style={StyleSheet.container}>
              <Text style={StyleSheet.questionText}>{question}</Text>
              <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer1')}>
                <Text style={StyleSheet.answertText}>{answer1}</Text>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer2')}>
                <Text style={StyleSheet.answertText}>{answer2}</Text>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer3')}>
                <Text style={StyleSheet.answertText}>{answer3}</Text>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer4')}>
                <Text style={StyleSheet.answertText}>{answer4}</Text>
              </TouchableHighlight>
            </View>
          )
        }
        {
          selected && correct && (
            <View style={StyleSheet.correctContainer}>
              <Text style={StyleSheet.questionText}>{question}</Text>
              <Text style={StyleSheet.answertText}>{answer1}</Text>
              <Text style={StyleSheet.answertText}>{answer2}</Text>
              <Text style={StyleSheet.answertText}>{answer3}</Text>
              <Text style={StyleSheet.answertText}>{answer4}</Text>
              <Text style={StyleSheet.answertText}>CORRECT</Text>
            </View>
          )
        }
        {
          selected && !correct && (
            <View style={StyleSheet.wrongContainer}>
              <Text style={StyleSheet.questionText}>{question}</Text>
              <Text style={StyleSheet.answertText}>{answer1}</Text>
              <Text style={StyleSheet.answertText}>{answer2}</Text>
              <Text style={StyleSheet.answertText}>{answer3}</Text>
              <Text style={StyleSheet.answertText}>{answer4}</Text>
              <Text style={StyleSheet.answertText}>INCORRECT</Text>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  correctContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#008000',
  },
  wrongContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ff0000',
  },
  questionText: {
    flex: 2,
    padding: 15,
    fontSize: 20,
  },
  answertText: {
    flex: 2,
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
  },
});
