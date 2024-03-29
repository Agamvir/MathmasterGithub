import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import firebase from 'firebase';

export default class Preface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      subtract: false,
      multiply: false,
      divide: false,
      beginner: false,
      medium: false,
      master: false,
      operationStateContainer: false,
      difficultyStateContainer: false
    };
  }

    goToDifficultyScreen = () => {
      if (this.state.add === true && this.state.beginner === true) {
        this.props.navigation.navigate('AdditionScreen');
      } else if (this.state.subtract === true && this.state.beginner === true) {
        this.props.navigation.navigate('SubtractionScreen')
      } else if (this.state.multiply === true && this.state.beginner === true) {
        this.props.navigation.navigate('MultiplicationScreen')
      } else if (this.state.divide === true && this.state.beginner === true) {
        this.props.navigation.navigate('DivisionScreen')
      } else if (this.state.add === true && this.state.medium === true) {
        this.props.navigation.navigate('AdditionScreen2')
      } else if (this.state.subtract === true && this.state.medium === true) {
        this.props.navigation.navigate('SubtractionScreen2')
      } else if (this.state.multiply === true && this.state.medium === true) {
        this.props.navigation.navigate('MultiplicationScreen2')
      } else if (this.state.divide === true && this.state.medium === true) {
        this.props.navigation.navigate('DivisionScreen2')
      } else if (this.state.add === true && this.state.master === true) {
        this.props.navigation.navigate('AdditionScreen3')
      } else if (this.state.subtract === true && this.state.master === true) {
        this.props.navigation.navigate('SubtractionScreen3')
      } else if (this.state.multiply === true && this.state.master === true) {
        this.props.navigation.navigate('MultiplicationScreen3')
      } else if (this.state.divide === true && this.state.master === true) {
        this.props.navigation.navigate('DivisionScreen3')
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> MATHMASTER </Text>
        <Text style={styles.caption}>
          {' '}
          Select the operations you want to be tested on:{' '}
        </Text>
        <TouchableOpacity
          style={
            this.state.add === true
              ? [styles.addition, { backgroundColor: 'red' }]
              : [styles.addition, { backgroundColor: '#3b0000' }]
          }
          onPress={() => {
            if (this.state.add === false) {
              this.setState({ add: true });
              this.setState({ operationStateContainer: true })
            } else {
              this.setState({ add: false });
              this.setState({ operationStateContainer: false })
            }

            this.setState({ subtract: false });
            this.setState({ multiply: false });
            this.setState({ divide: false });
          }}>
          <Text
            style={
              this.state.add === true
                ? [styles.displayText, { color: 'white' }]
                : [styles.displayText, { color: 'white' }]
            }>
            Addition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            this.state.subtract === true
              ? [styles.subtraction, { backgroundColor: 'yellow' }]
              : [styles.subtraction, { backgroundColor: '#383b00' }]
          }
          onPress={() => {
            if (this.state.subtract === false) {
              this.setState({ subtract: true });
              this.setState({ operationStateContainer: true })
            } else {
              this.setState({ subtract: false });
              this.setState({ operationStateContainer: false })
            }

            this.setState({ add: false });
            this.setState({ multiply: false });
            this.setState({ divide: false });
          }}>
          <Text
            style={
              this.state.subtract === true
                ? [styles.displayText, { color: 'black' }]
                : [styles.displayText, { color: 'white' }]
            }>
            Subtraction
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            this.state.multiply === true
              ? [styles.multiplication, { backgroundColor: 'blue' }]
              : [styles.multiplication, { backgroundColor: '#00003b' }]
          }
          onPress={() => {
            if (this.state.multiply === false) {
              this.setState({ multiply: true });
              this.setState({ operationStateContainer: true })
            } else {
              this.setState({ multiply: false });
              this.setState({ operationStateContainer: false })
            }

            this.setState({ add: false });
            this.setState({ subtract: false });
            this.setState({ divide: false });
          }}>
          <Text
            style={
              this.state.multiply === true
                ? [styles.displayText, { color: 'white' }]
                : [styles.displayText, { color: 'white' }]
            }>
            Multiplication
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            this.state.divide === true
              ? [styles.multiplication, { backgroundColor: 'lime' }]
              : [styles.multiplication, { backgroundColor: '#044d00' }]
          }
          onPress={() => {
            if (this.state.divide === false) {
              this.setState({ divide: true });
              this.setState({ operationStateContainer: true })
            } else {
              this.setState({ divide: false });
              this.setState({ operationStateContainer: false })
            }

            this.setState({ add: false });
            this.setState({ subtract: false });
            this.setState({ multiply: false });
          }}>
          <Text
            style={
              this.state.divide === true
                ? [styles.displayText, { color: 'black' }]
                : [styles.displayText, { color: 'white' }]
            }>
            Division
          </Text>
        </TouchableOpacity>

        <Text style={styles.caption}>Select the difficulty of your test:</Text>

        <TouchableOpacity style={
          this.state.beginner === true ? [styles.difficultyButton, {backgroundColor: 'white'}] : [styles.difficultyButton]
        } onPress={()=>{
          if (this.state.beginner === false) {
            this.setState({ beginner: true })
            this.setState({ difficultyStateContainer: true })
          } else if (this.state.beginner === true) {
            this.setState({ beginner: false })
            this.setState({ difficultyStateContainer: false })
          }

          this.setState({ medium: false });
          this.setState({ master: false })
        }}>
          <Text style={
            this.state.beginner === true ? [styles.displayText, {color: '#303340'}] : [styles.displayText, {color: 'white'}]
          }>Beginner (1 by 1 digit)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={
          this.state.medium === true ? [styles.difficultyButton, {backgroundColor: 'white'}] : [styles.difficultyButton]
        } onPress={()=>{
          if (this.state.medium === false) {
            this.setState({ medium: true })
            this.setState({ difficultyStateContainer: true })
          } else if (this.state.medium === true) {
            this.setState({ medium: false })
            this.setState({ difficultyStateContainer: false })
          }

          this.setState({ beginner: false });
          this.setState({ master: false })
        }}>
          <Text style={
            this.state.medium === true ? [styles.displayText, {color: '#303340'}] : [styles.displayText, {color: 'white'}]
          }>Medium (2 by 2 digit)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={
          this.state.master === true ? [styles.difficultyButton, {backgroundColor: 'white'}] : [styles.difficultyButton]
        } onPress={()=>{
          if (this.state.master === false) {
            this.setState({ master: true })
            this.setState({ difficultyStateContainer: true })
          } else if (this.state.master === true) {
            this.setState({ master: false })
            this.setState({ difficultyStateContainer: false })
          }

          this.setState({ beginner: false });
          this.setState({ medium: false })
        }}>
          <Text style={
            this.state.master === true ? [styles.displayText, {color: '#303340'}] : [styles.displayText, {color: 'white'}]
          }>Master (3 by 3 digit)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            this.state.operationStateContainer === false || this.state.difficultyStateContainer === false
              ? [styles.doneButton, { opacity: 0.0 }]
              : [styles.doneButton, { opacity: 1 }]
          }
          onPress={() => 
            this.goToDifficultyScreen()
          }>
          <Text style={styles.blackText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
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
  caption: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 500,
    color: 'white',
  },
  blackText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 350,
    color: 'black',
  },
  addition: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#3b0000',
    marginTop: 15,
  },
  subtraction: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#383b00',
    marginTop: 10,
  },
  multiplication: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#00003b',
    marginTop: 10,
  },
  difficultyButton: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#303340',
    marginTop: 10
  },
  doneButton: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#b3ff03',
    marginTop: 10,
    opacity: 0,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'chartreuse',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
});