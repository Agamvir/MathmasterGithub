import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      errorMessage: ''
    };
  }

googleSignIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    // Truncate displayName if longer than 8 characters
    let displayName = user.displayName;
    if (displayName.length > 8) {
      displayName = displayName.substring(0, 8);
    }

    const userRef = firebase.database().ref("/users/" + user.uid);
    userRef.once('value', snapshot => {
      if (!snapshot.exists()) {
        userRef.set({ 
          displayName: displayName,
          email: user.email,
          gainedMP: 0,
          league: 'Bronze',
          nextLeague: 'Silver',
          neededMP: 1000
        });
      }
    });
    
    // Navigate to the portal after sign-in
    this.props.navigation.navigate('Portal');
  } catch (error) {
    console.error('Google sign-in error:', error);
    this.setState({ errorMessage: 'Error logging in.' })
  }
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={styles.caption}>Login to your account.</Text>
        <TouchableOpacity style={styles.button} onPress={this.googleSignIn}>
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessageStyling}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  caption: {
    fontSize: 20,
    fontWeight: '600',
    color: '#b0eb86',
    marginTop: 10,
    marginBottom: 100
  },
  errorMessageStyling: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    marginTop: 0,
  },
  button: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#78e32b',
    marginTop: 15,
  },
});