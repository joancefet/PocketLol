import React from 'react';
import {
  View, Text, StyleSheet, Picker, Alert, ScrollView,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import WarningFromStart from './WarningFromStart';
import { getSummonerBySummonerName, getLeageBySummonerId } from '../API/LolAPI';
import EnteteProfil from './entete_profil';
import RankImage from './rank_image';
import PolarChart from './PolarChart';

const Item = Picker.Item;

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.index10 = 10;
    this.state = {
      pseudo: '',
      profileIconId: 0,
      accountId: 0,
      id: 0,
      // -----------SOLO
      hotStreakSolo: false,
      winsSolo: 0,
      veteranSolo: false,
      lossesSolo: 0,
      rankSolo: '',
      tierSolo: '',
      leaguePointsSolo: 0,
      // ----------FLEX
      hotStreakFlex: false,
      winsFlex: 0,
      veteranFlex: false,
      lossesFlex: 0,
      rankFlex: '',
      tierFlex: '',
      leaguePointsFlex: 0,
      //---------------
      popupVisible: false,
      server: 'EUW1',
    };
  }

  // on v�rifie que le state a �t� update et l'appli re-rendu
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) { this.loadLeague(); }
  }

    // On r�cup�re la saisie du pseudo
    searchTextInputChanged = (text) => {
      this.setState({ pseudo: text });
    }

    updateServer = (server) => {
      this.setState({ server });
    }

    // --------------- Section Popup pseudo
    showPopup = () => {
      this.setState({ popupVisible: true });
    }

    informationPopup = () => {
      // le user a cliquer sur le bouton valider mes infos, ici on recup les infos
      // On verifie que le pseudo existe !
      this.loadSummoner();
      this.setState({ popupVisible: false });
    }

    cancelPopup = () => {
      this.setState({ popupVisible: false });
    }
    //----------------------------------------------

    bonusStreak = (streak) => {
      if (streak === true) {
        return (
          <Text style={styles.container_streak}>
on fire
          </Text>
        );
      }
      return undefined;
    }

    bonusWinrate = (winrate, totalGames) => {
      if (winrate >= 60) {
        return (
          <Text style={styles.container_smurfing}>
smurfing
          </Text>
        );
      }
      if (winrate < 60 && winrate >= 54) {
        return (
          <Text style={styles.container_good}>
good
          </Text>
        );
      }
      if (winrate < 49 && winrate > 45 && totalGames > 40) {
        return (
          <Text style={styles.container_icare}>
icare
          </Text>
        );
      }
      if (winrate <= 45 && totalGames > 40) {
        return (
          <Text style={styles.container_bad}>
bad
          </Text>
        );
      }
      return undefined;
    }

    bonusVeteran = (veteran) => {
      if (veteran === true) {
        return (
          <Text style={styles.container_veteran}>
veteran
          </Text>
        );
      }
      return undefined;
    }

    calculWinratio = (win, defeat) => {
      if (isNaN(Math.round((win / (win + defeat)) * 100))) { return '--'; }
      return Math.round((win / (win + defeat)) * 100);
    }

    unranked = (tier) => {
      if (tier === '') { return 'UNRANKED'; }
      return undefined;
    }

    // on r�cup�re les infos du profil via l'id du compte
    loadLeague() {
      getLeageBySummonerId(this.state.id, this.state.server).then((data) => {
        let i = 0;
        while (i < 3) {
          if (data[i] !== undefined) {
            if (data[i].queueType === 'RANKED_SOLO_5x5') {
              this.setState({
                hotStreakSolo: data[i].hotStreak,
                winsSolo: data[i].wins,
                veteranSolo: data[i].veteran,
                lossesSolo: data[i].losses,
                rankSolo: data[i].rank,
                tierSolo: data[i].tier,
                leaguePointsSolo: data[i].leaguePoints,
              });
            }
            if (data[i].queueType === 'RANKED_FLEX_SR') {
              this.setState({
                hotStreakFlex: data[i].hotStreak,
                winsFlex: data[i].wins,
                veteranFlex: data[i].veteran,
                lossesFlex: data[i].losses,
                rankFlex: data[i].rank,
                tierFlex: data[i].tier,
                leaguePointsFlex: data[i].leaguePoints,
              });
            }
          }
          i += 1;
        }
      });
    }

    // on r�cup�re les infos du profil via le pseudo
    loadSummoner() {
      this.resetAllpreviousVariable();
      // appel API League of legends
      getSummonerBySummonerName(this.state.pseudo, this.state.server).then((data) => {
        // on verifie que le profil existe sur l'api et on recup les champs qui nous interesse
        if (data.name === undefined) {
          Alert.alert('Pseudo incorrect');
          const action = { type: 'PSEUDO_IS_INVALIDE', value: -1 };
          this.props.dispatch(action);
        } else {
          this.setState({
            profileIconId: data.profileIconId,
            accountId: data.accountId,
            id: data.id,
            pseudo: data.name,
          });
          const action = { type: 'PSEUDO_IS_VALIDE', value: 1 };
          this.props.dispatch(action);
          this.props.dispatch({
            type: 'ADD_INFO_ACCOUNT', textPseudo: this.state.pseudo, textId: this.state.id, textAccountId: this.state.accountId, textServerUsed: this.state.server,
          });
        }
      });
    }

    resetAllpreviousVariable() {
      this.setState({
        profileIconId: 0,
        accountId: 0,
        id: 0,
        // -----------SOLO
        hotStreakSolo: false,
        winsSolo: 0,
        veteranSolo: false,
        lossesSolo: 0,
        rankSolo: '',
        tierSolo: '',
        leaguePointsSolo: 0,
        // ----------FLEX
        hotStreakFlex: false,
        winsFlex: 0,
        veteranFlex: false,
        lossesFlex: 0,
        rankFlex: '',
        tierFlex: '',
        leaguePointsFlex: 0,
      });
    }

    afficheSoloqRank() {
      return (
        <View style={styles.container_categorie}>
          <RankImage tier={this.state.tierSolo} rank={this.state.rankSolo} />
          <Text style={styles.text_parag}>
            {this.state.tierSolo}
            {' '}
            {this.state.rankSolo}
            {this.unranked(this.state.tierSolo)}
          </Text>
          <Text style={styles.text_parag}>
            {this.state.leaguePointsSolo}
            {' '}
LP
          </Text>
          <Text style={styles.text_parag}>
            {this.state.winsSolo}
V
            {' '}
            {this.state.lossesSolo}
D
          </Text>
          <Text style={styles.text_parag}>SOLO Q</Text>
          <Text style={styles.text_parag}>
            {'Win Ratio '}
            {this.calculWinratio(this.state.winsSolo, this.state.lossesSolo)}
%
          </Text>
          <View style={styles.container_bonus}>
            {this.bonusStreak(this.state.hotStreakSolo)}
            {this.bonusWinrate((Math.round((this.state.winsSolo
            / (this.state.winsSolo + this.state.lossesSolo)) * 100)),
            (this.state.winsSolo + this.state.lossesSolo))}
            {this.bonusVeteran(this.state.veteranSolo)}
            <Text />
          </View>
        </View>
      );
    }

    afficheFlexRank() {
      return (
        <View style={styles.container_categorie}>
          <RankImage tier={this.state.tierFlex} rank={this.state.rankFlex} />
          <Text style={styles.text_parag}>
            {this.state.tierFlex}
            {' '}
            {this.state.rankFlex}
            {this.unranked(this.state.tierFlex)}
          </Text>
          <Text style={styles.text_parag}>
            {this.state.leaguePointsFlex}
            {' '}
LP
          </Text>
          <Text style={styles.text_parag}>
            {this.state.winsFlex}
V
            {' '}
            {this.state.lossesFlex}
D
          </Text>
          <Text style={styles.text_parag}>FLEX Q</Text>
          <Text style={styles.text_parag}>
            {'Win Ratio '}
            {this.calculWinratio(this.state.winsFlex, this.state.lossesFlex)}
%
          </Text>
          <View style={styles.container_bonus}>
            {this.bonusStreak(this.state.hotStreakFlex, (Math.round((this.state.winsFlex
              / (this.state.winsFlex + this.state.lossesFlex)) * 100)),
            this.state.veteranFlex, (this.state.winsFlex + this.state.lossesFlex))}
            {this.bonusWinrate((Math.round((this.state.winsFlex
              / (this.state.winsFlex + this.state.lossesFlex)) * 100)),
            (this.state.winsFlex + this.state.lossesFlex))}
            {this.bonusVeteran(this.state.veteranFlex)}
            <Text />
          </View>
        </View>
      );
    }

    afficheProfilPage() {
      if (this.props.pseudoValide.pseudoValide) {
        return (
          <View>
            <ScrollView>
              <EnteteProfil image={this.state.profileIconId} />
              <View style={styles.container_rank}>
                {this.afficheSoloqRank()}
                <View
                  style={styles.barre_sep}
                />
                {this.afficheFlexRank()}
              </View>
              <PolarChart />
            </ScrollView>
          </View>
        );
      }
      return undefined;
    }

    render() {
      return (
        <View style={styles.container_background}>
          <WarningFromStart />
          {this.afficheProfilPage()}
          {/* ------------------------------- */}
          <Dialog.Container visible={this.state.popupVisible}>
            {/* eslint-disable-next-line react-native/no-raw-text */}
            <Dialog.Title>League of Legends Account</Dialog.Title>
            <Dialog.Input
              label="Pseudo :"
              onChangeText={this.searchTextInputChanged}
            />
            <Text style={styles.picker_server_title}>Server :</Text>
            <Picker
              style={styles.picker_server}
              selectedValue={this.state.server}
              onValueChange={this.updateServer}
            >
              <Item label="EUW" value="EUW1" />
              <Item label="NA" value="NA1" />
              <Item label="KR" value="KR" />
              <Item label="LAN" value="LAN" />
              <Item label="BR" value="BR1" />
              <Item label="RU" value="RU" />
              <Item label="OCE" value="OC1" />
              <Item label="JP" value="JP1" />
              <Item label="TR" value="TR1" />
              <Item label="LAS" value="LAS" />
              <Item label="EUNE" value="EUN1" />
            </Picker>
            <Dialog.Button label="Cancel" onPress={this.cancelPopup} />
            <Dialog.Button label="Enter" onPress={this.informationPopup} />
          </Dialog.Container>
          {/* ------------------------------- */}
          {/* Rest of the app comes ABOVE the action button component ! */}
          <ActionButton
            buttonColor="#3c82e7"
            offsetX={20}
            offsetY={20}
            size={64}
            onPress={this.showPopup}
          />
        </View>
      );
    }
}

const colorGrey = 'grey';
const colorGreyClair = '#EAEAEA';
const colorWhite = 'white';
const colorGreen = '#42B289';
const colorRed = '#E74C3C';
const colorBarre = '#555E5E';
const styles = StyleSheet.create({
  barre_sep: {
    alignSelf: 'center',
    backgroundColor: colorBarre,
    height: '60%',
    marginLeft: '1%',
    marginRight: '1%',
    width: 1,
  },
  container_background: {
    backgroundColor: colorGreyClair,
    flex: 1,
  },
  container_bad: {
    backgroundColor: colorRed,
    borderColor: colorRed,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0.1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 35,
  },
  container_bonus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_categorie: {
    alignSelf: 'center',
    flex: 1,
  },
  container_good: {
    backgroundColor: colorGreen,
    borderColor: colorGreen,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0.1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 35,
  },
  container_icare: {
    backgroundColor: colorRed,
    borderColor: colorRed,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 40,
  },
  container_rank: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  container_smurfing: {
    backgroundColor: colorGreen,
    borderColor: colorGreen,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0.1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 55,
  },
  container_streak: {
    backgroundColor: colorGreen,
    borderColor: colorGreen,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0.1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 45,
  },
  container_veteran: {
    backgroundColor: colorRed,
    borderColor: colorRed,
    borderRadius: 4,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 11,
    height: 16,
    letterSpacing: -0.1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    width: 52,
  },
  picker_server: {
    marginLeft: 9,
  },
  picker_server_title: {
    color: colorGrey,
    letterSpacing: 0.2,
    marginLeft: 9,
  },
  text_parag: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  variableForChart: state.variableForChart,
  gamesNumber: state.gamesNumber,
  url: state.url,
});

export default connect(mapStateToProps)(Profil);
