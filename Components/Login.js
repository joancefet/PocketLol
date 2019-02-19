import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Font } from 'expo';

const arialFont = require('../Font/Arial.ttf');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
      fontLoaded: false,
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Arial: arialFont,
    });
    this.setState({ fontLoaded: true });
  }

  async signup() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: 'account created',
      });

      setTimeout(() => {
        this.props.navigator.push({
          name: 'Account',
        });
      }, 1500);
    } catch (error) {
      this.setState({
        response: error.toString(),
      });
    }
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: 'Logged In!',
      });

      setTimeout(() => {
        this.props.navigator.push({
          name: 'Account',
        });
      }, 1500);
    } catch (error) {
      this.setState({
        response: error.toString(),
      });
    }
  }

  render() {
    if (!this.state.fontLoaded) return null;
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.title}>Identify yourself!</Text>
            <Sae
              label="Email Address"
              iconClass={FontAwesomeIcon}
              iconName="pencil"
              iconColor="white"
              onChangeText={email => this.setState({ email })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Sae
              label="Password"
              iconClass={FontAwesomeIcon}
              iconName="key"
              iconColor="white"
              onChangeText={password => this.setState({ password })}
              password
              autoCapitalize="none"
            />

            <View style={styles.submit}>
              <Button
                onPress={this.signup}
                style={styles.buttons}
                title="Sign up"
              />
              <Text />
              <Text />
              <Button
                onPress={this.login}
                style={styles.buttons}
                title="Login"
              />
            </View>
          </View>
          <View>
            <Text style={styles.response}>{this.state.response}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const colorBlue = '#b2d0e4';
const colorSmoke = 'whitesmoke';
const colorBlack = '#000';
const styles = StyleSheet.create({
  buttons: {
    backgroundColor: colorSmoke,
    fontSize: 18,
  },
  container: {
    backgroundColor: colorBlue,
    flex: 1,
  },
  formGroup: {
    padding: 50,
  },
  response: {
    padding: 50,
    paddingTop: 0,
    textAlign: 'center',
  },
  submit: {
    paddingTop: 30,
  },
  title: {
    color: colorBlack,
    fontSize: 35,
    fontWeight: 'bold',
    opacity: 0.8,
    paddingBottom: 16,
    textAlign: 'center',
  },
});

module.exports = Login;
