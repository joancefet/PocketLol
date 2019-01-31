import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { connect } from 'react-redux';

const cupImage = require('../Images/cup/cup.png');

class EnteteProfil extends React.PureComponent {
  render() {
    return (
      <View style={styles.container_entete}>
        <Image
          style={styles.cup_image}
          source={cupImage}
        />
        <View style={styles.container_image_profil}>
          <Image
            style={styles.container_image}
            source={{ uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${this.props.image}.jpg` }}
          />
          <Text style={styles.container_pseudo}>
            {this.props.dataAccount.pseudoUsed}
          </Text>

        </View>

        <Image
          style={styles.cup_image}
          source={cupImage}
        />
      </View>
    );
  }
}

const colorDarkBlue = '#2C3548';
const colorYellow = '#EABD53';
const styles = StyleSheet.create({
  container_entete: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_image: {
    borderColor: colorYellow,
    borderWidth: 1,
    height: 100,
    width: 100,
  },
  container_image_profil: {
    flex: 1,
  },
  container_pseudo: {
    backgroundColor: colorDarkBlue,
    borderColor: colorYellow,
    borderRadius: 20,
    borderWidth: 1,
    color: colorYellow,
    fontSize: 12,
    letterSpacing: -0.2,
    marginTop: -7,
    textAlign: 'center',
    width: 100,
  },
  cup_image: {
    flex: 1.2,
    height: 100,
    marginBottom: 5,
    marginTop: 5,
    width: 100,
  },
});


const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  nbItems: state.nbItems,
  nbEliminating: state.nbEliminating,
});

export default connect(mapStateToProps)(EnteteProfil);
