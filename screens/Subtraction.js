import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Animated
} from 'react-native';

export default class SubtractionScreen extends Component {
  constructor(props) {
    super(props);
    this.fadeValue = new Animated.Value(1);
    this.state = {
      answer: "",
      feedbackResponse: "()",
      startTime: 0,
      questionNumber: 1,
      timeTakenArray: [], // Array to store time taken for each correct answer
      answersCorrect: 0, // Counter for correct answers
      value1: Math.floor(Math.random() * 9) + 1,
      value2: Math.floor(Math.random() * 9) + 1,
    };
  }

  componentDidMount() {
    this.setState({ startTime: new Date().getTime() / 1000 }); // Initialize startTime
    Animated.timing(this.fadeValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  animateFade = () => {
    Animated.timing(this.fadeValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.fadeValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  }

  check = () => {
    const { value1, value2, answer, startTime, answersCorrect, timeTakenArray } = this.state;
    const endTime = new Date().getTime() / 1000;
    const timeTaken = endTime - startTime; // Calculate time taken correctly

    if (answer == value1 - value2) {
      let updatedAnswersCorrect = answersCorrect + 1;
      let updatedTimeTakenArray = timeTakenArray.slice();
      updatedTimeTakenArray.push(timeTaken);

      this.setState({
        answersCorrect: updatedAnswersCorrect,
        timeTakenArray: updatedTimeTakenArray,
        value1: Math.floor(Math.random() * 9) + 1,
        value2: Math.floor(Math.random() * 9) + 1,
        questionNumber: this.state.questionNumber + 1,
        startTime: new Date().getTime() / 1000, // Update startTime
        feedbackResponse: `Correct! You took ${timeTaken.toFixed(2)} seconds.`,
        answer: "",
      });
    } else {
      this.setState({
        value1: Math.floor(Math.random() * 9) + 1,
        value2: Math.floor(Math.random() * 9) + 1,
        questionNumber: this.state.questionNumber + 1,
        startTime: new Date().getTime() / 1000,
        feedbackResponse: "Incorrect.",
        answer: "",
      });
    }
    this.animateFade();
  };

  render() {
    const { answer, value1, value2, totalScore, questionNumber, feedbackResponse } = this.state;

    if (this.state.questionNumber === 11) {
      const { timeTakenArray, answersCorrect } = this.state;
      const totalQuestions = 10; // Total questions asked

      // Calculate average time taken
      const totalElapsedTime = timeTakenArray.reduce((acc, curr) => acc + curr, 0);
      const averageTimeTaken = totalElapsedTime / answersCorrect;

      return (
        <View style={styles.container}>
          <Text style={styles.title}>MATHMASTER</Text>

          <Text style={styles.whiteText}>You have completed the test.</Text>

          <Text style={[styles.whiteText, { color: '#d3fac3' }]}>Score: {answersCorrect}/{totalQuestions}</Text>
          <Text style={[styles.whiteText, { color: '#c3defa' }]}>Average Time Taken: {averageTimeTaken.toFixed(2)} seconds</Text>
          <TouchableOpacity style={styles.restartButton} onPress={() => this.props.navigation.navigate('Preface')}>
            <Text style={[styles.whiteButtonText, {color: 'black'}]}>Replay!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.portalNavigatorButton} onPress={() => this.props.navigation.navigate('Portal')}>
            <Text style={styles.whiteButtonText}>Portal</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>MATHMASTER</Text>
            <Text style={styles.box}>Question {questionNumber}</Text>
            <Text style={styles.box2}>
              {value1}-{value2}
            </Text>
            <Animated.View style={{ opacity: this.fadeValue }}>
              <Text style={styles.caption}>
                {feedbackResponse}
              </Text>
            </Animated.View>
            {/* Input */}
            <TextInput
              style={styles.textinput}
              placeholder={'Answer Here'}
              onSubmitEditing={() => this.check()}
              autoFocus={true}
              onChangeText={(text) => this.setState({ answer: text })}
              value={answer}
            />
            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.check()}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 35,
    fontWeight: 700,
    color: 'white',
  },
  box: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 30,
    fontWeight: 600,
    backgroundColor: '#fcca00',
    color: 'white',
  },
  box2: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: 600,
    backgroundColor: 'navy',
    color: 'white',
  },
  caption: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 400,
    color: 'white',
    marginTop: 150
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginTop: 0
  },
  textinput: {
    width: '91%',
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#5653D4',
    color: '#FFFFFF',
    marginTop: 40,
    marginLeft: 15,
  },
  button: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'blue',
    marginTop: -50,
    marginLeft: 170,
  },
  restartButton: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#b3ff03',
    marginTop: 100,
  },
  portalNavigatorButton: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#32a852',
    marginTop: 20,
  },
  whiteText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 500,
    color: 'white',
    marginTop: 40
  },
  whiteButtonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 500,
    color: 'white',
    marginTop: 0
  },
});