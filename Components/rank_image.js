import React from 'react';
import {
  View, Image, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

const masterIcon = require('../Images/tier-icons/master.png');
const challengerIcon = require('../Images/tier-icons/challenger.png');
const unrankedIcon = require('../Images/tier-icons/unranked.png');

class RankImage extends React.Component {
  afficheImage = (tier, rank) => {
    if (tier === 'DIAMOND') {
      return (
        <Image
          style={styles.container_image}
          source={{ uri: `http://image.noelshack.com/fichiers/2018/44/7/1541363500-${tier.toLowerCase()}-${rank.toLowerCase()}.png` }}
        />
      );
    }
    if (tier === 'PLATINUM') {
      return (
        <Image
          style={styles.container_image}
          source={{ uri: `http://image.noelshack.com/fichiers/2018/44/7/1541364005-${tier.toLowerCase()}-${rank.toLowerCase()}.png` }}
        />
      );
    }
    if (tier === 'GOLD') {
      return (
        <Image
          style={styles.container_image}
          source={{ uri: `http://image.noelshack.com/fichiers/2018/44/7/1541363971-${tier.toLowerCase()}-${rank.toLowerCase()}.png` }}
        />
      );
    }
    if (tier === 'SILVER') {
      return (
        <Image
          style={styles.container_image}
          source={{ uri: `http://image.noelshack.com/fichiers/2018/44/7/1541363928-${tier.toLowerCase()}-${rank.toLowerCase()}.png` }}
        />
      );
    }
    if (tier === 'BRONZE') {
      return (
        <Image
          style={styles.container_image}
          source={{ uri: `http://image.noelshack.com/fichiers/2018/44/7/1541363816-${tier.toLowerCase()}-${rank.toLowerCase()}.png` }}
        />
      );
    }
    if (tier === 'MASTER') {
      return (
        <Image
          style={styles.container_image}
          source={masterIcon}
        />
      );
    }
    if (tier === 'CHALLENGER') {
      return (
        <Image
          style={styles.container_image}
          source={challengerIcon}
        />
      );
    }

    return (
      <Image
        style={styles.container_image}
        source={unrankedIcon}
      />

    );
  }

  render() {
    return (
      <View style={styles.container_message}>
        {this.afficheImage(this.props.tier, this.props.rank)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_image: {
    height: 100,
    width: 100,
  },
  container_message: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
});

export default connect(mapStateToProps)(RankImage);
