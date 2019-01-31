import React from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import WarningFromStart from './WarningFromStart';
import { getMatchsByAccountId } from '../API/LolAPI';
import LoadHistorique from './LoadHistorique';

const buttonAll = require('../Images/roles/all_but.png');
const buttonTop = require('../Images/roles/top_but.png');
const buttonJungle = require('../Images/roles/jungle_but.png');
const buttonMiddle = require('../Images/roles/mid_but.png');
const buttonSupp = require('../Images/roles/sup_but.png');
const buttonAdc = require('../Images/roles/adc_but.png');

class Historique extends React.PureComponent {
  constructor(props) {
    super(props);
    this.index10 = 100;
    this.compIsMounted = false;
    this.state = {
      games: [],
    };
  }


  componentDidMount() {
    this.compIsMounted = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataAccount.accountIdUsed !== prevProps.dataAccount.accountIdUsed) {
      // this.state.games.length = 0;
      this.props.dispatch({
        type: 'ADD_VAR', one_more: 0, one_more_eliminating: 0, one_more_time: 0, one_more_survivability: 0, one_more_objectives: 0, one_more_victorious: 0, one_more_vision: 0, one_more_supporting: 0,
      });
      this.loadHistoriqueAll();
    }
  }

  componentWillUnmount() {
    this.compIsMounted = false;
  }

    loadHistoriqueAll = () => {
      if (this.compIsMounted) {
        this.props.dispatch({ type: 'ADD_GAMES_NUMBER', gamesNumber: -1 });
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          this.props.dispatch({ type: 'ADD_GAMES_NUMBER', gamesNumber: 0 });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].queue === 400
                  || data.matches[i].queue === 420 || data.matches[i].queue === 440) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.props.dispatch({ type: 'ADD_GAMES_NUMBER', gamesNumber: gamesTempo.length });
          this.setState({ games: gamesTempo });
        });
      }
    }

    // on r�cup�re les games ou le joueur joue MID
    loadHistoriqueMid = () => {
      if (this.compIsMounted) {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].lane === 'MID' && (data.matches[i].queue === 400
                  || data.matches[i].queue === 420 || data.matches[i].queue === 440)) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.setState({ games: gamesTempo });
        });
      }
    }

    // on r�cup�re les games ou le joueur joue TOP
    loadHistoriqueTop = () => {
      if (this.compIsMounted) {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].lane === 'TOP' && (data.matches[i].queue === 400
                  || data.matches[i].queue === 420 || data.matches[i].queue === 440)) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.setState({ games: gamesTempo });
        });
      }
    }

    // on r�cup�re les games ou le joueur joue JUNGLE
    loadHistoriqueJungle = () => {
      if (this.compIsMounted) {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].lane === 'JUNGLE' && (data.matches[i].queue === 400
                  || data.matches[i].queue === 420 || data.matches[i].queue === 440)) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.setState({ games: gamesTempo });
        });
      }
    }

    // on r�cup�re les games ou le joueur joue bottom
    loadHistoriqueBot = () => {
      if (this.compIsMounted) {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].role === 'DUO_CARRY' && data.matches[i].lane === 'BOTTOM'
                                && (data.matches[i].queue === 400
                                  || data.matches[i].queue === 420
                                  || data.matches[i].queue === 440)) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.setState({ games: gamesTempo });
        });
      }
    }

    // on r�cup�re les games ou le joueur joue support
    loadHistoriqueSup = () => {
      if (this.compIsMounted) {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed,
          this.props.dataAccount.serverUsed, this.index10).then((data) => {
          let i = 0;
          let j = 0;
          let gamesTempo = [];
          this.setState({ games: [] });
          while (i < 100 && j < 20) {
            if (typeof (data.matches) !== 'undefined') {
              if (typeof (data.matches[i]) !== 'undefined') {
                if (data.matches[i].role === 'DUO_SUPPORT' && data.matches[i].lane === 'BOTTOM'
                                && (data.matches[i].queue === 400 || data.matches[i].queue === 420
                                  || data.matches[i].queue === 440)) {
                  gamesTempo = [...gamesTempo, data.matches[i]];
                  j += 1;
                }
              }
            } else { i = 100; }
            i += 1;
          }
          this.setState({ games: gamesTempo });
        });
      }
    }

    renderSeparator = () => (
      <View
        style={styles.separator}
      />
    )

    ListEmpty = () => (
      // View to show when list is empty
      <View>
        <Text style={styles.list_empty}>
          Couldnt load history, the player has not played since a while...
        </Text>
      </View>
    )

    // fait parti de ma FlatList, mis ici pour optimiser le temps d'affichage
    renderItem = ({ item }) => (<LoadHistorique game={item} />);

    afficheHistoriquePage() {
      if (this.props.pseudoValide.pseudoValide && this.props.dataAccount.accountIdUsed !== 0) {
        return (
          <View style={styles.launch_page}>
            <View style={styles.historique}>
              <FlatList
                style={styles.flatlist_histo}
                data={this.state.games}
                keyExtractor={item => item.gameId.toString()}
                renderItem={this.renderItem}
                initialNumToRender={20}
                ItemSeparatorComponent={this.renderSeparator}
                ListEmptyComponent={this.ListEmpty}
                removeClippedSubviews
              />
            </View>

            <View style={styles.list_roles}>
              <TouchableOpacity
                onPress={this.loadHistoriqueAll}
              >
                <Image
                  source={buttonAll}
                  style={styles.button_image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loadHistoriqueTop}
              >
                <Image
                  source={buttonTop}
                  style={styles.button_image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loadHistoriqueJungle}
              >
                <Image
                  source={buttonJungle}
                  style={styles.button_image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loadHistoriqueMid}
              >
                <Image
                  source={buttonMiddle}
                  style={styles.button_image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loadHistoriqueSup}
              >
                <Image
                  source={buttonSupp}
                  style={styles.button_image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loadHistoriqueBot}
              >
                <Image
                  source={buttonAdc}
                  style={styles.button_image}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      return undefined;
    }


    render() {
      return (
        <View style={styles.container_background}>
          <WarningFromStart />
          {this.afficheHistoriquePage()}
        </View>
      );
    }
}

const colorGreyClair = '#EAEAEA';
const colorGrey = '#CED0CE';
const styles = StyleSheet.create({
  button_image: {
    flex: 1,
    height: 60,
    width: 60,
  },
  container_background: {
    backgroundColor: colorGreyClair,
    flex: 1,
  },
  historique: {
    flex: 8,
  },
  launch_page: {
    flex: 1,
  },
  list_empty: {
    fontSize: 18,
    left: '8%',
    marginTop: '60%',
    textAlign: 'center',
    width: 300,
  },
  list_roles: {
    backgroundColor: colorGrey,
    flex: 0.83,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    backgroundColor: colorGrey,
    height: 3,
    width: '100%',
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  variableForChart: state.variableForChart,
  gamesNumber: state.gamesNumber,
});

export default connect(mapStateToProps)(Historique);
