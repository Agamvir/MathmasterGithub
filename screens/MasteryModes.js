import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import firebase from 'firebase';

export default class MasteryModes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoP: false,
      fourP: false,
      message: ''
    };
  }

  queue = () => {
    if (this.state.twoP == false && this.state.fourP == false){
      this.setState({message: 'Pick a gamemode.'})
    } else if (this.state.twoP == true) {
      this.setState({message: 'Searching for match...'})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={styles.caption}>Queue for a match.</Text>
        <TouchableOpacity style={
          this.state.twoP === false ? [styles.button, {backgroundColor: 'navy'}] : [styles.button]
        } onPress={
          this.state.twoP === false ? [this.setState({twoP: true})] : [this.setState({twoP: false})]
          }>
          <Text style={styles.buttonText}>Duels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.comingSoonButton} onPress={()=>this.props.navigation.navigate('Portal')}>
          <Text style={styles.comingSoonButtonText}>Coming Soon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={
          this.queue
          }>
          <Text style={styles.buttonText}>Queue</Text>
        </TouchableOpacity>
        <Text style={styles.caption}>{this.state.message}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  caption: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },
  bronze: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#a16518',
  },
  silver: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: 'silver',
  },
  gold: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#f5c20c',
  },
  diamond: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#67d1f5',
  },
  emerald: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#0fd433',
  },
  mythic: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#e8361e',
  },
  currentLev: {
    fontSize: 16,
    marginRight: 10,
    color: 'white'
  },
  nextLev: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white'
  },
  progressText: {
    fontSize: 16,
    marginTop: 10,
    color: 'white'
  },
  imageIcon: {
    width: 150,
    height: 150,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'blue',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  comingSoonButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
    marginTop: 20,
  },
  comingSoonButtonText: {
    fontSize: 20,
    color: 'gray',
  },
});