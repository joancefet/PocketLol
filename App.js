import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Navigation from './Navigation/Navigation';
import Store from './Store/configureStore';

YellowBox.ignoreWarnings(['Setting a timer']);
const myconsole = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    myconsole.warn(message);
  }
};

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDrVNf3fr2EpAFSuSMBK6h0RUFyyYM-0JQ',
      authDomain: 'pocketlol.firebaseapp.com',
      databaseURL: 'https://pocketlol.firebaseio.com',
      projectId: 'pocketlol',
      storageBucket: 'pocketlol.appspot.com',
      messagingSenderId: '792731491060',
    });
  }

  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
