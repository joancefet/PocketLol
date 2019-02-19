import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import {
  Camera, Constants, Location, Permissions,
} from 'expo';
import Database from '../Firebase/database';

const defaultProfile = require('../Images/default_profil.png');
const appareilPhoto = require('../Images/photo_appareil.png');
const updatePhoto = require('../Images/update.png');
const cameraPhoto = require('../Images/camera.png');
const backPhoto = require('../Images/back.png');

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      mobile: '',
      mobileForm: '',
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      camera: false,
      location: null,
      errorMessage: null,
    };

    global.urlImage = '';
    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }


  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });

      // Get User Credentials
      const user = await firebase.auth().currentUser;

      // Listen for Mobile Changes
      Database.listenUserMobile(user.uid, (mobileNumber) => {
        this.setState({
          mobile: mobileNumber,
          mobileForm: mobileNumber,
        });
      });

      this.setState({
        uid: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
    this.downloadImage();

    // //////////
    if (!Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      console.log('ask permission');
      this.getLocationAsync();
    }
  }

    uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();


      const ref = firebase.storage().ref().child(`${this.state.uid}/${imageName}`);
      return ref.put(blob);
    }

    getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    };

    onPictureSaved = async (photo) => {
      this.setState({ image: photo });
      // more load here
      console.log(this.state.image.uri);
      this.uploadImage(this.state.image.uri, 'profil-image')
        .then(() => {
          Alert.alert('Success');
          this.setState({ camera: false });
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }

    afficheImageProfil = () => {
      if (urlImage === '') {
        return (
          <Image
            style={styles.image_profil}
            source={defaultProfile}
          />
        );
      }
      return (
        <Image
          style={styles.image_profil}
          source={{ uri: urlImage }}
        />
      );
    }

    async updateProfil() {
      await this.downloadImage();
      this.forceUpdate();
    }

    async logout() {
      try {
        await firebase.auth().signOut();
        this.props.navigator.push({
          name: 'Login',
        });
      } catch (error) {
        console.log(error);
      }
    }

    takePicture() {
      console.log(`take picturze :${this.state.uid}`);
      if (this.camera) {
        this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
          this.onPictureSaved(data);
        });
      }
    }

    saveMobile() {
      // Set Mobile
      if (this.state.uid && this.state.mobileForm) {
        Database.setUserMobile(this.state.uid, this.state.mobileForm);
      }
    }

    async downloadImage() {
      const storage = firebase.storage();
      // Create a reference to the file we want to download
      const starsRef = storage.ref(`${this.state.uid}/profil-image`);
      // Get the download URL
      await starsRef.getDownloadURL().then((url) => {
        urlImage = url;
        console.log('download_fonction');
        console.log(`urlImage bon ? ${urlImage}`);
      }).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          default:
            break;
        }
      });
    }

    showCamera() {
      if (this.state.camera === false && this.state.hasCameraPermission !== null) {
        this.setState({
          camera: true,
        });
      } else {
        this.setState({
          camera: false,
        });
      }
    }

    back() {
      this.setState({ camera: false });
    }

    render() {
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
      if (this.state.camera === false) {
        return (
          <View
            style={styles.container}
          >
            <View style={styles.container_photo_profil}>
              {this.afficheImageProfil()}
            </View>
            <View style={styles.container_options}>
              <TouchableOpacity
                onPress={this.showCamera.bind(this)}
              >
                <Image
                  style={styles.image_appareil}
                  source={appareilPhoto}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.updateProfil.bind(this)}
              >
                <Image
                  style={styles.image_refresh}
                  source={updatePhoto}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.container_flex_one}>
              <Text style={styles.heading}>
Your Id:
                {this.state.uid}
              </Text>
              <Text style={styles.heading}>
Your Mobile Number :
                {this.state.mobile}
              </Text>
            </View>
            <Text style={styles.paragraph}>
Informations from your gps:
              {text}
            </Text>

            <View style={styles.form}>
              <Sae
                label="Phone Number"
                iconClass={FontAwesomeIcon}
                iconName="mobile"
                iconColor="white"
                onChangeText={mobileForm => this.setState({ mobileForm })}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Button
                onPress={this.saveMobile}
                style={styles.buttonss}
                title="Save"
              />
            </View>
            <View style={styles.buttons}>
              <Button
                onPress={this.logout}
                style={styles.buttonss}
                title="Logout"
              />
            </View>
          </View>
        // </View>
        );
      }

      return (
        <View style={styles.container}>
          <Camera
            style={styles.container_flex_one}
            ref={(ref) => { this.camera = ref; }}
            type={this.state.type}
          >
            <View
              style={styles.camera_screen}
            >
              <TouchableOpacity
                style={styles.container_flip}
                onPress={() => {
                  this.setState(prevState => ({
                    type: prevState.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  }));
                }}
              >
                <Text
                  style={styles.text_flip}
                >
                  {' '}
Flip
                  {' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={styles.container_camera_photo}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
            >
              <Image
                style={styles.camera_photo}
                source={cameraPhoto}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.back.bind(this)}
            >
              <Image
                style={styles.back_photo}
                source={backPhoto}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const colorWhite = 'white';
const colorYellow = '#EABD53';
const colorBlue = '#b2d0e4';
const colorSmoke = 'whitesmoke';
const colorTrans = 'transparent';
const styles = StyleSheet.create({
  back_photo: {
    height: 30,
    marginLeft: 200,
    marginTop: 17,
    width: 30,
  },
  buttons: {
    flex: 1,
    padding: 30,
  },
  buttonss: {
    backgroundColor: colorSmoke,
    flex: 1,
    fontSize: 18,
  },
  camera_photo: {
    height: 50,
    marginBottom: 6,
    marginTop: 8,
    width: 50,
  },
  camera_screen: {
    backgroundColor: colorTrans,
    flex: 6,
    flexDirection: 'row',
    height: 400,
    width: 1200,
  },
  container: {
    backgroundColor: colorBlue,
    flex: 1,
  },
  container_camera_photo: {
    flex: 0.13,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_flex_one: {
    flex: 1,
  },
  container_flip: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 0.1,
  },
  container_options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_photo_profil: {
    flex: 4.7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
    paddingTop: 20,
  },
  heading: {
    textAlign: 'center',
  },
  image_appareil: {
    height: 15,
    marginRight: 5,
    marginTop: 2,
    width: 15,
  },
  image_profil: {
    borderColor: colorYellow,
    borderWidth: 1,
    height: 120,
    width: 120,
  },
  image_refresh: {
    height: 15,
    marginLeft: 5,
    marginTop: 2,
    width: 15,
  },
  paragraph: {
    flex: 6,
    fontSize: 18,
    margin: 24,
    textAlign: 'center',
  },
  text_flip: {
    color: colorWhite,
    fontSize: 18,
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  variableForChart: state.variableForChart,
  gamesNumber: state.gamesNumber,
  url: state.url,
});

export default connect(mapStateToProps)(Account);
