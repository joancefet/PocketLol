import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { getInfoMatchByMatchId, getLasVersionddragon } from '../API/LolAPI';

const igniteImage = require('../Images/spells/ignite.png');
const flashImage = require('../Images/spells/flash.png');
const healImage = require('../Images/spells/heal.png');
const smiteImage = require('../Images/spells/smite.png');
const exhaustImage = require('../Images/spells/exhaust.png');
const cleansImage = require('../Images/spells/cleans.png');
const ghostImage = require('../Images/spells/ghost.png');
const tpImage = require('../Images/spells/tp.png');
const shieldImage = require('../Images/spells/shield.png');
const yesImage = require('../Images/validate/yes.png');
const noImage = require('../Images/validate/no.png');
const noneImage = require('../Images/item_none/none.png');

class LoadHistorique extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ddragonVersion = 0;
    this.champLevel = 0;
    this.participantId = 0;
    this.gameDuration = 0;
    this.win = false;
    this.firstBlood = false;
    this.firstTower = false;
    this.firstDragon = false;
    this.firstRiftHerald = false;
    this.firstInhibitor = false;
    this.number_objectives = 0;
    this.spell1 = 0;
    this.spell2 = 0;
    this.item0 = 0;
    this.item1 = 0;
    this.item2 = 0;
    this.item3 = 0;
    this.item4 = 0;
    this.item5 = 0;
    this.item6 = 0;
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.doubleKills = 0;
    this.tripleKills = 0;
    this.quadraKills = 0;
    this.pentaKills = 0;
    this.totalMinionsKilled = 0;
    this.killsId1 = 0;
    this.killsId2 = 0;
    this.killsId3 = 0;
    this.killsId4 = 0;
    this.killsId5 = 0;
    this.visionScore = 0;
    this.teamId = 0;
    this.tDDTC = 0;
    this.tDDTC1 = 0;
    this.tDDTC2 = 0;
    this.tDDTC3 = 0;
    this.tDDTC4 = 0;
    this.tDDTC5 = 0;
    this.neutralMinionsKilled = 0;
    this.nMKilledEJungle = 0;
    this.nMKilledTJungle = 0;
    this.compIsMounted = false;
    this.state = {
      tout_est_ok: false,
    };
  }

  componentDidMount() {
    this.compIsMounted = true;
    this.getInfoGame();
    this.getTheLasVersionddragon();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState && this.props.variableForChart.nbItems < 10
      && Math.trunc(this.gameDuration / 60) > 4) {
      if (this.win === true) {
        this.props.dispatch({
          type: 'ADD_VAR',
          one_more: this.props.variableForChart.nbItems + 1,
          one_more_eliminating: this.props.variableForChart.nbEliminating
          + this.kills + this.assists,
          one_more_time: this.props.variableForChart.nbTime + Math.trunc(this.gameDuration / 60),
          one_more_survivability: this.props.variableForChart.nbSurvivability + this.deaths,
          one_more_objectives: this.props.variableForChart.nbObjectives + this.number_objectives,
          one_more_victorious: this.props.variableForChart.nbVictorious + 1,
          one_more_vision: this.props.variableForChart.nbVision + this.visionScore,
          one_more_supporting: this.props.variableForChart.nbSupporting
          + (Math.round((this.kills + this.assists) / (this.killsId1
            + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100)),
        });
      } else {
        this.props.dispatch({
          type: 'ADD_VAR',
          one_more: this.props.variableForChart.nbItems + 1,
          one_more_eliminating: this.props.variableForChart.nbEliminating
          + this.kills + this.assists,
          one_more_time: this.props.variableForChart.nbTime + Math.trunc(this.gameDuration / 60),
          one_more_survivability: this.props.variableForChart.nbSurvivability + this.deaths,
          one_more_objectives: this.props.variableForChart.nbObjectives + this.number_objectives,
          one_more_victorious: this.props.variableForChart.nbVictorious + 0,
          one_more_vision: this.props.variableForChart.nbVision + this.visionScore,
          one_more_supporting: this.props.variableForChart.nbSupporting
          + (Math.round((this.kills + this.assists) / (this.killsId1 + this.killsId2
            + this.killsId3 + this.killsId4 + this.killsId5) * 100)),
        });
      }
    }
  }

  componentWillUnmount() {
    this.compIsMounted = false;
  }

    getInfoGame = () => {
      let i = 0;
      let p = 0;
      if (this.compIsMounted) {
        getInfoMatchByMatchId(this.props.game.gameId,
          this.props.dataAccount.serverUsed).then((data) => {
          if (typeof (data) !== 'undefined') {
            // parce qu'on a 10 joueurs
            while (i < 10) {
              if (typeof (data.participantIdentities) !== 'undefined') {
                if (this.props.dataAccount.pseudoUsed.toLowerCase()
                === data.participantIdentities[i].player.summonerName.toLowerCase()) {
                  if (i >= 0 && i <= 4) {
                    this.killsId1 = data.participants[0].stats.kills;
                    this.killsId2 = data.participants[1].stats.kills;
                    this.killsId3 = data.participants[2].stats.kills;
                    this.killsId4 = data.participants[3].stats.kills;
                    this.killsId5 = data.participants[4].stats.kills;
                    this.tDDTC1 = data.participants[0].stats.totalDamageDealtToChampions;
                    this.tDDTC2 = data.participants[1].stats.totalDamageDealtToChampions;
                    this.tDDTC3 = data.participants[2].stats.totalDamageDealtToChampions;
                    this.tDDTC4 = data.participants[3].stats.totalDamageDealtToChampions;
                    this.tDDTC5 = data.participants[4].stats.totalDamageDealtToChampions;
                  }
                  if (i >= 5 && i <= 9) {
                    this.killsId1 = data.participants[5].stats.kills;
                    this.killsId2 = data.participants[6].stats.kills;
                    this.killsId3 = data.participants[7].stats.kills;
                    this.killsId4 = data.participants[8].stats.kills;
                    this.killsId5 = data.participants[9].stats.kills;
                    this.tDDTC1 = data.participants[5].stats.totalDamageDealtToChampions;
                    this.tDDTC2 = data.participants[6].stats.totalDamageDealtToChampions;
                    this.tDDTC3 = data.participants[7].stats.totalDamageDealtToChampions;
                    this.tDDTC4 = data.participants[8].stats.totalDamageDealtToChampions;
                    this.tDDTC5 = data.participants[9].stats.totalDamageDealtToChampions;
                  }
                  while (p < 2) {
                    if (data.participants[i].teamId === data.teams[p].teamId) {
                      this.firstBlood = data.teams[p].firstBlood;
                      this.firstTower = data.teams[p].firstTower;
                      this.firstDragon = data.teams[p].firstDragon;
                      this.firstRiftHerald = data.teams[p].firstRiftHerald;
                      this.firstInhibitor = data.teams[p].firstInhibitor;
                      let j = 0;
                      if (this.firstBlood === true) { j += 1; }
                      if (this.firstDragon === true) { j += 1; }
                      if (this.firstInhibitor === true) { j += 1; }
                      if (this.firstRiftHerald === true) { j += 1; }
                      if (this.firstTower === true) { j += 1; }
                      this.number_objectives = j;
                      p = 3;
                    }
                    p += 1;
                  }
                  // console.log(data.participants[i].stats)
                  this.champLevel = data.participants[i].stats.champLevel;
                  this.participantId = data.participantIdentities[i].participantId;
                  this.win = data.participants[i].stats.win;
                  this.spell1 = data.participants[i].spell1Id;
                  this.spell2 = data.participants[i].spell2Id;
                  this.gameDuration = data.gameDuration;
                  this.item0 = data.participants[i].stats.item0;
                  this.item1 = data.participants[i].stats.item1;
                  this.item2 = data.participants[i].stats.item2;
                  this.item3 = data.participants[i].stats.item3;
                  this.item4 = data.participants[i].stats.item4;
                  this.item5 = data.participants[i].stats.item5;
                  this.item6 = data.participants[i].stats.item6;
                  this.kills = data.participants[i].stats.kills;
                  this.deaths = data.participants[i].stats.deaths;
                  this.assists = data.participants[i].stats.assists;
                  this.doubleKills = data.participants[i].stats.doubleKills;
                  this.tripleKills = data.participants[i].stats.tripleKills;
                  this.quadraKills = data.participants[i].stats.quadraKills;
                  this.pentaKills = data.participants[i].stats.pentaKills;
                  this.totalMinionsKilled = data.participants[i].stats.totalMinionsKilled;
                  this.visionScore = data.participants[i].stats.visionScore;
                  this.tDDTC = data.participants[i].stats.totalDamageDealtToChampions;
                  this.neutralMinionsKilled = data.participants[i].stats.neutralMinionsKilled;
                  this.nMKilledEJungle = data.participants[i].stats.neutralMinionsKilledEnemyJungle;
                  this.nMKilledTJungle = data.participants[i].stats.neutralMinionsKilledTeamJungle;
                  this.setState({
                    tout_est_ok: true,
                  });

                  i = 11;
                }
              }
              i += 1;
            }
          }
        });
      }
    }

    getTheLasVersionddragon = () => {
      getLasVersionddragon().then((data) => {
        this.ddragonVersion = data[0];
      });
    }

    getSpells1() {
      if (this.spell1 === 14) {
        return (
          <Image
            source={igniteImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 4) {
        return (
          <Image
            source={flashImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 7) {
        return (
          <Image
            source={healImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 11) {
        return (
          <Image
            source={smiteImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 3) {
        return (
          <Image
            source={exhaustImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 1) {
        return (
          <Image
            source={cleansImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 6) {
        return (
          <Image
            source={ghostImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell1 === 12) {
        return (
          <Image
            source={tpImage}
            style={styles.image_spells}
          />
        );
      }

      return (
        <Image
          source={shieldImage}
          style={styles.image_spells}
        />
      );
    }

    getSpells2() {
      if (this.spell2 === 14) {
        return (
          <Image
            source={igniteImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 4) {
        return (
          <Image
            source={flashImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 7) {
        return (
          <Image
            source={healImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 11) {
        return (
          <Image
            source={smiteImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 3) {
        return (
          <Image
            source={exhaustImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 1) {
        return (
          <Image
            source={cleansImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 6) {
        return (
          <Image
            source={ghostImage}
            style={styles.image_spells}
          />
        );
      }
      if (this.spell2 === 12) {
        return (
          <Image
            source={tpImage}
            style={styles.image_spells}
          />
        );
      }

      return (
        <Image
          source={shieldImage}
          style={styles.image_spells}
        />
      );
    }

    typeGame = () => {
      if (game.queue === 400) {
        return (
          <Text>5v5 Draft</Text>
        );
      }
      if (game.queue === 420) {
        return (
          <Text>5v5 Ranked</Text>
        );
      }
      if (game.queue === 440) {
        return (
          <Text>5v5 Flex</Text>
        );
      }
      return undefined;
    }

    afficheResult = () => {
      if (this.win === true && Math.trunc(this.gameDuration / 60) > 4) {
        return (
          <Text>Victory</Text>
        );
      }
      if (this.win === false && Math.trunc(this.gameDuration / 60) > 4) {
        return (
          <Text>Defeat</Text>
        );
      }
      return (
        <Text>Remake</Text>
      );
    }

    afficheScore = () => (
      <View style={styles.container_score_kda}>
        <Text style={styles.text_kda}>
          <Text style={styles.text_killsAssist}>{this.kills}</Text>
          <Text style={styles.kda_text}> /</Text>
          <Text style={styles.text_deaths}>
            {' '}
            {this.deaths}
          </Text>
          <Text style={styles.kda_text}> /</Text>
          <Text style={styles.text_killsAssist}>
            {' '}
            {this.assists}
          </Text>
        </Text>
      </View>
    )

    afficheKDA = () => {
      if (this.deaths === 0) {
        return (
          <Text>Perfect</Text>
        );
      }
      return (
        <Text>{((this.kills + this.assists) / this.deaths).toFixed(2)}</Text>
      );
    }

    afficheKills = () => {
      if (this.doubleKills !== 0 || this.tripleKills !== 0
        || this.quadraKills !== 0 || this.pentaKills !== 0) {
        if (this.pentaKills !== 0) {
          return (
            <Text style={styles.multi_kills}>
Penta Kill
            </Text>
          );
        }
        if (this.quadraKills !== 0) {
          return (
            <Text style={styles.multi_kills}>
Quadra Kill
            </Text>
          );
        }
        if (this.tripleKills !== 0) {
          return (
            <Text style={styles.multi_kills}>
Triple Kill
            </Text>
          );
        }
        if (this.doubleKills !== 0) {
          return (
            <Text style={styles.multi_kills}>
Double Kill
            </Text>
          );
        }
      } else {
        return (
          <Text />
        );
      }
      return undefined;
    }

    afficheFarm = () => (
      <Text style={styles.text_cs}>
        {(this.totalMinionsKilled + this.nMKilledEJungle
          + this.nMKilledTJungle)}
        {' '}
CS
      </Text>
    )

    afficheLevel = () => (
      <Text style={styles.text_level}>
        {'Level '}
        {this.champLevel}
      </Text>
    )

    afficheKillParticipation = () => {
      if (isNaN(Math.round((this.kills + this.assists) / (this.killsId1
        + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100))) {
        return (
          <View style={styles.container_raw}>
            <Text style={styles.text_pourcent}>P/Kill </Text>
            <Text style={styles.text_number}>
0
            </Text>
            <Text style={styles.text_pourcent}>%</Text>
          </View>
        );
      }

      return (
        <View style={styles.container_raw}>
          <Text style={styles.text_pourcent}>P/Kill </Text>
          <Text style={styles.text_number}>
            {Math.round((this.kills + this.assists) / (this.killsId1
              + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100)}
          </Text>
          <Text style={styles.text_pourcent}>%</Text>
        </View>
      );
    }

    afficheDamageParticipation = () => (
      <View style={styles.container_raw}>
        <Text style={styles.text_pourcent}>P/Damage </Text>
        <Text style={styles.text_number}>
          {Math.round((this.tDDTC) / (this.tDDTC1
            + this.tDDTC2 + this.tDDTC3
            + this.tDDTC4 + this.tDDTC5) * 100)}
        </Text>
        <Text style={styles.text_pourcent}>%</Text>
      </View>
    )

    afficheVisionScore = () => (
      <Text style={styles.vision_text}>
        {'Vision '}
        {this.visionScore}
      </Text>
    )

    afficheObjectifYesOrNo = (item) => {
      if (item === true) {
        return (
          <Image
            style={styles.objectifs_image}
            source={yesImage}
          />
        );
      }

      return (
        <Image
          style={styles.objectifs_image}
          source={noImage}
        />
      );
    }

    afficheTime() {
      return (
        <Text>
          {Math.trunc(this.gameDuration / 60)}
min
        </Text>
      );
    }

    afficheItems(item) {
      if (item !== 0) {
        return (
          <View>
            <Image
              style={styles.image_items}
              source={{ uri: `http://ddragon.leagueoflegends.com/cdn/${this.ddragonVersion}/img/item/${item}.png` }}
            />
          </View>
        );
      }

      return (
        <View>
          <Image
            style={styles.image_items}
            source={noneImage}
          />
        </View>
      );
    }


    render() {
      game = this.props.game;
      if (this.state.tout_est_ok) {
        return (
          <View style={this.win === true ? styles.main_container_w : styles.main_container_d}>
            {/* container gauche image + spells */}
            <View style={styles.container_left}>
              <Image
                style={styles.container_image_champion}
                source={{ uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${game.champion}.png` }}
              />
              <View style={styles.container_summs_spell}>
                <View style={styles.container_summs_spell1}>{this.getSpells1()}</View>
                <View style={styles.container_summs_spell2}>{this.getSpells2()}</View>
              </View>
            </View>
            {/* container droit info de la partie en g�n�ral */}
            <View style={styles.container_right}>
              <View style={this.win === true ? styles.c_top_win : styles.c_top_defeat}>
                <Text style={styles.container_top}>{this.typeGame()}</Text>
                <Text style={styles.container_top}>{this.afficheResult()}</Text>
                <Text style={styles.container_top}>{this.afficheTime()}</Text>
              </View>
              <View style={styles.container_board_resume}>
                <View>

                  <View style={styles.container_scores}>
                    <View style={styles.flex_two} />
                    <View style={styles.flex_one}>
                      {this.afficheScore()}
                      <View style={styles.container_kda}>
                        <Text style={styles.kda_fontsize}>{this.afficheKDA()}</Text>
                        <Text style={styles.kda_text}> KDA</Text>
                      </View>
                    </View>
                    <View style={styles.container_kills}>
                      {this.afficheKills()}
                    </View>
                    <View style={styles.flex_one} />
                  </View>
                  <View style={styles.container_items1}>
                    {this.afficheItems(this.item0)}
                    {this.afficheItems(this.item1)}
                    {this.afficheItems(this.item2)}
                    {this.afficheItems(this.item6)}
                  </View>
                  <View style={styles.container_items2}>
                    {this.afficheItems(this.item3)}
                    {this.afficheItems(this.item4)}
                    {this.afficheItems(this.item5)}
                  </View>
                </View>
                {/*  partie avec les stats perso par rapport � la teams */}
                <View style={styles.container_stats_jeu}>
                  <View style={styles.flex_one} />
                  <Text style={styles.flex_one}>{this.afficheLevel()}</Text>
                  <Text style={styles.flex_one}>{this.afficheFarm()}</Text>
                  {this.afficheKillParticipation()}
                  {this.afficheDamageParticipation()}
                  <Text style={styles.flex_one}>{this.afficheVisionScore()}</Text>
                </View>
                {/* partie de s�paration */}
                <View
                  style={this.win === true ? styles.barre_sep_win : styles.barre_sep_defeat}
                />
                {/*  partie avec les objectifs d'afficher (tower, first kill, dragons etc) */}
                <View style={styles.container_info_objct}>
                  <View style={styles.flex_one} />
                  <View style={styles.container_objectifs}>
                    <Text style={styles.text_objectifs}>
First Blood
                    </Text>
                    {this.afficheObjectifYesOrNo(this.firstBlood)}
                  </View>
                  <View style={styles.container_objectifs}>
                    <Text style={styles.text_objectifs}>
First Tower
                    </Text>
                    {this.afficheObjectifYesOrNo(this.firstTower)}
                  </View>
                  <View style={styles.container_objectifs}>
                    <Text style={styles.text_objectifs}>
First Dragon
                    </Text>
                    {this.afficheObjectifYesOrNo(this.firstDragon)}
                  </View>
                  <View style={styles.container_objectifs}>
                    <Text style={styles.text_objectifs}>
First Herald
                    </Text>
                    {this.afficheObjectifYesOrNo(this.firstRiftHerald)}
                  </View>
                  <View style={styles.container_objectifs}>
                    <Text style={styles.text_objectifs}>
First Inhibitor
                    </Text>
                    {this.afficheObjectifYesOrNo(this.firstInhibitor)}
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }

      return (
        <View />
      );
    }
}

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  variableForChart: state.variableForChart,
});

const colorDarkGrey = '#494F4F';
const colorDarkBlue = '#4aa1d2';
const colorBlue = '#64b1e4';
const colorDarkRed = '#d67b77';
const colorRed = '#e89d99';
const colorWhite = 'white';
const colorRedRed = '#C6443E';
const colorGrey = '#555E5E';
const colorBlueSky = '#A3CFEC';
const colorRedSky = '#e2b6b3';
const styles = StyleSheet.create({
  barre_sep_defeat: {
    backgroundColor: colorDarkRed,
    height: '100%',
    marginLeft: '1%',
    marginRight: '1%',
    width: 1,
  },
  barre_sep_win: {
    backgroundColor: colorDarkBlue,
    height: '100%',
    marginLeft: '1%',
    marginRight: '1%',
    width: 1,
  },
  c_top_defeat: {
    alignItems: 'center',
    backgroundColor: colorRed,
    borderBottomColor: colorDarkRed,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  c_top_win: {
    alignItems: 'center',
    backgroundColor: colorBlue,
    borderBottomColor: colorDarkBlue,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_board_resume: {
    flex: 1,
    flexDirection: 'row',
  },
  container_image_champion: {
    height: 90,
    width: 90,
  },
  container_info_objct: {
    flex: 1.7,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container_items1: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_items2: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
  },
  container_kda: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_kills: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_left: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  container_objectifs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_raw: {
    flex: 1,
    flexDirection: 'row',
  },
  container_right: {
    flex: 3,
  },
  container_score_kda: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container_scores: {
    flex: 8,
  },
  container_stats_jeu: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container_summs_spell: {
    flexDirection: 'row',
  },
  container_top: {
    flex: 1,
    textAlign: 'center',
  },
  flex_one: {
    flex: 1,
  },
  flex_two: {
    flex: 2,
  },
  image_items: {
    borderRadius: 10,
    height: 20,
    marginLeft: 1,
    marginRight: 1,
    width: 20,
  },
  image_spells: {
    flex: 1,
    height: 45,
    width: 45,
  },
  kda_fontsize: {
    fontSize: 14,
  },
  kda_text: {
    color: colorGrey,
  },
  main_container_d: {
    backgroundColor: colorRedSky,
    flexDirection: 'row',
  },
  main_container_w: {
    backgroundColor: colorBlueSky,
    flexDirection: 'row',
  },
  multi_kills: {
    backgroundColor: colorRedRed,
    borderColor: colorRedRed,
    borderRadius: 20,
    borderWidth: 1,
    color: colorWhite,
    fontSize: 10,
    height: 14,
    letterSpacing: -0.5,
    textAlign: 'center',
    width: 55,
  },
  objectifs_image: {
    height: 10,
    justifyContent: 'flex-end',
    marginRight: 1.5,
    marginTop: 1,
    width: 10,
  },
  text_cs: {
    color: colorGrey,
    fontSize: 13,
  },
  text_deaths: {
    color: colorRedRed,
    fontWeight: 'bold',
  },
  text_kda: {
    fontSize: 16,
    letterSpacing: -1,
  },
  text_killsAssist: {
    color: colorDarkGrey,
    fontWeight: 'bold',
  },
  text_level: {
    color: colorGrey,
    fontSize: 12,
  },
  text_number: {
    color: colorRedRed,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  text_objectifs: {
    color: colorGrey,
    fontSize: 10,
    justifyContent: 'flex-start',
    marginLeft: 2,
  },
  text_pourcent: {
    color: colorRedRed,
    fontSize: 12,
    letterSpacing: -1,
  },
  vision_text: {
    color: colorGrey,
    fontSize: 13,
  },
});

export default connect(mapStateToProps)(LoadHistorique);
