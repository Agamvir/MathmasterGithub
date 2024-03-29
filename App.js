import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Preface from './screens/TrainingPreface.js';
import AdditionScreen from './screens/Addition.js';
import SubtractionScreen from './screens/Subtraction.js';
import DivisionScreen from './screens/Division.js';
import MultiplicationScreen from './screens/Multiplication.js';
import AdditionScreen2 from './screens/AdditionMed.js';
import SubtractionScreen2 from './screens/SubtractionMed.js';
import DivisionScreen2 from './screens/DivisionMed.js';
import MultiplicationScreen2 from './screens/MultiplicationMed.js';
import AdditionScreen3 from './screens/AdditionMas.js';
import SubtractionScreen3 from './screens/SubtractionMas.js';
import DivisionScreen3 from './screens/DivisionMas.js';
import MultiplicationScreen3 from './screens/MultiplicationMas';
import LoginScreen from './screens/Login';
import Portal from './screens/Portal';
import Locker from './screens/Locker';
import Stats from './screens/Stats';
import MasteryModes from './screens/MasteryModes';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import  firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


export default class App extends Component {
  constructor(){
    super();
  }

  render() {
    return(
      <AppContainer />
    )
  }
}

var AppNavigator = createSwitchNavigator({
    LoginScreen: LoginScreen,
    Portal: Portal,
    Locker: Locker,
    Preface: Preface,
    MasteryModes: MasteryModes,
    Stats: Stats,
    AdditionScreen: AdditionScreen,
    SubtractionScreen: SubtractionScreen,
    MultiplicationScreen: MultiplicationScreen,
    DivisionScreen: DivisionScreen,
    AdditionScreen2: AdditionScreen2,
    SubtractionScreen2: SubtractionScreen2,
    MultiplicationScreen2: MultiplicationScreen2,
    DivisionScreen2: DivisionScreen2,
    AdditionScreen3: AdditionScreen3,
    SubtractionScreen3: SubtractionScreen3,
    MultiplicationScreen3: MultiplicationScreen3,
    DivisionScreen3: DivisionScreen3,
})

const AppContainer = createAppContainer(AppNavigator);

