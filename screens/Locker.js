import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebase from 'firebase';

export default class Locker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Loading...', // Placeholder username
      errorMessage: '',
      newUsername: '',
    };
  }

  componentDidMount() {
    // Load the username from Firebase when the component mounts
    this.loadUsername();
  }

  // Function to load the username from Firebase Realtime Database
  loadUsername = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      firebase.database().ref("users/" + uid).once('value')
        .then(snapshot => {
          const userData = snapshot.val();
          if (userData && userData.displayName) {
            this.setState({ username: userData.displayName });
          } else {
            console.log("No username found in database");
          }
        })
        .catch(error => {
          console.error("Error getting username from database:", error);
        });
    } else {
      console.log("User not signed in.");
    }
  };

  // Function to handle the submission of the new username
  handleSubmit = () => {
  const { newUsername } = this.state;
  if (newUsername.trim() === '') {
    this.setState({ errorMessage: 'Please enter a valid username.' });
  } else if (newUsername.length > 8) {
    this.setState({ errorMessage: 'Username cannot exceed 8 characters.' });
  } else {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      const usersRef = firebase.database().ref("users");
      // Check if the username already exists
      usersRef.orderByChild("displayName").equalTo(newUsername).once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            // Username already taken
            this.setState({ errorMessage: 'Username already taken.' });
          } else {
            // Username is available, update in the database
            usersRef.child(uid).update({
              displayName: newUsername
            })
            .then(() => {
              console.log("Display name updated successfully!");
              this.setState({ username: newUsername, errorMessage: '' });
            })
            .catch((error) => {
              console.error("Error updating display name: ", error);
            });
          }
        })
        .catch(error => {
          console.error("Error checking username availability:", error);
        });
    } else {
      console.log("User not signed in.");
    }
  }
};

  check = () => {
    if (this.state.username === 'Loading...') {
      this.setState({ errorMessage: 'Please wait while loading...' });
    } else {
      this.props.navigation.navigate('Portal');
    }
  };

  render() {
    const { username, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={styles.tinyText}>My Username</Text>
        <Text style={styles.caption}>{username}</Text>
        <Text style={styles.tinyText}>Change Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ newUsername: text })}
          placeholder="Enter new username"
          onSubmitEditing={this.handleSubmit}
        />
        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>
            Submit Changes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.check}>
          <Text style={styles.buttonText}>
            Portal
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorMessageStyling}>{errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  caption: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
  tinyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  textInput: {
    width: '75%',
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#5653D4',
    color: '#FFFFFF',
    marginTop: 20,
    marginLeft: 45,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#32a852',
    marginTop: 20,
  },
  submitButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'yellow',
    marginTop: 70,
  },
  errorMessageStyling: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    marginTop: 30,
    marginLeft: 30
  },
});