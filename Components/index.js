import React, {
  Component,
} from 'react';

import {
  AppRegistry,
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';

import * as firebase from 'firebase';

import Account from './Account';
import Login from './Login';

class Initial extends Component {
  static configureScene(route) {
    if (route.sceneConfig) {
      return (route.sceneConfig);
    }
    return ({
      ...Navigator.SceneConfigs.HorizontalSwipeJump,
      gestures: {},
    });
  }

  constructor(props) {
    super(props);

    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null,
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged(() => {
      // let initialView = user ? "Account" : "Login";
      const initialView = 'Login';

      this.setState({
        userLoaded: true,
        initialView,
      });
    });
  }

  static renderScene(route, navigator) {
    switch (route.name) {
      case 'Account':
        return (<Account navigator={navigator} />);
      case 'Login':
        return (<Login navigator={navigator} />);
      default:
        return undefined;
    }
  }

  render() {
    if (this.state.userLoaded) {
      return (
        <Navigator
          initialRoute={{ name: this.state.initialView }}
          renderScene={Initial.renderScene}
          configureScene={Initial.configureScene}
        />
      );
    }
    return null;
  }
}

AppRegistry.registerComponent('FirebaseReactNative', () => Initial);
export default Initial;
