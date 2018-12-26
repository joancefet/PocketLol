import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { connect } from 'react-redux'
import { getInfoMatchByMatchId, getLasVersionddragon } from "../API/LolAPI"

class LoadHistorique extends React.PureComponent {
    constructor(props) {
        super(props)
            this.ddragonVersion = 0
            this.champLevel = 0
            this.participantId = 0
            this.gameDuration = 0
            this.win = false
                this.firstBlood = false
                this.firstTower = false
                this.firstDragon = false
                this.firstRiftHerald = false
                this.firstInhibitor = false
                this.number_objectives = 0
                this.spell1 = 0
                this.spell2 = 0
                this.item0 = 0
                this.item1 = 0
                this.item2 = 0
                this.item3 = 0
                this.item4 = 0
                this.item5 = 0
                this.item6 = 0
                this.kills = 0
                this.deaths = 0
                this.assists = 0
                this.doubleKills = 0
                this.tripleKills = 0
                this.quadraKills = 0
                this.pentaKills = 0
                this.totalMinionsKilled = 0
                this.killsId1 = 0
                this.killsId2 = 0
                this.killsId3 = 0
                this.killsId4 = 0
                this.killsId5 = 0
                this.visionScore = 0
                this.teamId = 0
                this.totalDamageDealtToChampions = 0
                this.totalDamageDealtToChampions1 = 0
                this.totalDamageDealtToChampions2 = 0
                this.totalDamageDealtToChampions3 = 0
                this.totalDamageDealtToChampions4 = 0
                this.totalDamageDealtToChampions5 = 0
                this.neutralMinionsKilled = 0
                this.neutralMinionsKilledEnemyJungle = 0
                this.neutralMinionsKilledTeamJungle = 0
                this._isMounted = false
                this.state = {
                    tout_est_ok: false,
            }
    }


    //recup les infos de la game
    _getInfoGame = () => {
        var i = 0
        var p = 0
        if (this._isMounted) {
            getInfoMatchByMatchId(this.props.game.gameId, this.props.dataAccount.serverUsed).then(data => {
                if (typeof (data) !== 'undefined') {
                    //parce qu'on a 10 joueurs
                    while (i < 10) {
                        if (typeof (data.participantIdentities) !== 'undefined') {
                            if (this.props.dataAccount.pseudoUsed.toLowerCase() == data.participantIdentities[i].player.summonerName.toLowerCase()) {
                                if (i >= 0 && i <= 4) {
                                    this.killsId1 = data.participants[0].stats.kills
                                    this.killsId2 = data.participants[1].stats.kills
                                    this.killsId3 = data.participants[2].stats.kills
                                    this.killsId4 = data.participants[3].stats.kills
                                    this.killsId5 = data.participants[4].stats.kills
                                    this.totalDamageDealtToChampions1 = data.participants[0].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions2 = data.participants[1].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions3 = data.participants[2].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions4 = data.participants[3].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions5 = data.participants[4].stats.totalDamageDealtToChampions
                                }
                                if (i >= 5 && i <= 9) {
                                    this.killsId1 = data.participants[5].stats.kills
                                    this.killsId2 = data.participants[6].stats.kills
                                    this.killsId3 = data.participants[7].stats.kills
                                    this.killsId4 = data.participants[8].stats.kills
                                    this.killsId5 = data.participants[9].stats.kills
                                    this.totalDamageDealtToChampions1 = data.participants[5].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions2 = data.participants[6].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions3 = data.participants[7].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions4 = data.participants[8].stats.totalDamageDealtToChampions
                                    this.totalDamageDealtToChampions5 = data.participants[9].stats.totalDamageDealtToChampions
                                }
                                while (p < 2) {
                                    if (data.participants[i].teamId == data.teams[p].teamId) {
                                        this.firstBlood = data.teams[p].firstBlood
                                        this.firstTower = data.teams[p].firstTower
                                        this.firstDragon = data.teams[p].firstDragon
                                        this.firstRiftHerald = data.teams[p].firstRiftHerald
                                        this.firstInhibitor = data.teams[p].firstInhibitor
                                        var j = 0
                                        if (this.firstBlood == true)
                                            j++
                                        if (this.firstDragon == true)
                                            j++
                                        if (this.firstInhibitor == true)
                                            j++
                                        if (this.firstRiftHerald == true)
                                            j++
                                        if (this.firstTower == true)
                                            j++
                                        this.number_objectives = j
                                        p = 3
                                    }
                                    p++
                                }
                                //console.log(data.participants[i].stats)
                                this.champLevel = data.participants[i].stats.champLevel
                                this.participantId = data.participantIdentities[i].participantId
                                this.win = data.participants[i].stats.win
                                this.spell1 = data.participants[i].spell1Id
                                this.spell2 = data.participants[i].spell2Id
                                this.gameDuration = data.gameDuration
                                this.item0 = data.participants[i].stats.item0
                                this.item1 = data.participants[i].stats.item1
                                this.item2 = data.participants[i].stats.item2
                                this.item3 = data.participants[i].stats.item3
                                this.item4 = data.participants[i].stats.item4
                                this.item5 = data.participants[i].stats.item5
                                this.item6 = data.participants[i].stats.item6
                                this.kills = data.participants[i].stats.kills
                                this.deaths = data.participants[i].stats.deaths
                                this.assists = data.participants[i].stats.assists
                                this.doubleKills = data.participants[i].stats.doubleKills
                                this.tripleKills = data.participants[i].stats.tripleKills
                                this.quadraKills = data.participants[i].stats.quadraKills
                                this.pentaKills = data.participants[i].stats.pentaKills
                                this.totalMinionsKilled = data.participants[i].stats.totalMinionsKilled
                                this.visionScore = data.participants[i].stats.visionScore
                                this.totalDamageDealtToChampions = data.participants[i].stats.totalDamageDealtToChampions
                                this.neutralMinionsKilled = data.participants[i].stats.neutralMinionsKilled
                                this.neutralMinionsKilledEnemyJungle = data.participants[i].stats.neutralMinionsKilledEnemyJungle
                                this.neutralMinionsKilledTeamJungle = data.participants[i].stats.neutralMinionsKilledTeamJungle
                                this.setState({
                                    tout_est_ok: true,
                                })
                                
                                i = 11
                            }
                        }
                        i++
                    }
                }
            })
        }
    }

    _getLasVersionddragon = () => {
        getLasVersionddragon().then(data => {
            this.ddragonVersion = data[0]
        })
    }

    _getSpells1() {
        if (this.spell1 == 14) {
            return (
                <Image
                    source={require("../Images/spells/ignite.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )

        }
        if (this.spell1 == 4) {
            return (
                <Image
                    source={require("../Images/spells/flash.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 7) {
            return (
                <Image
                    source={require("../Images/spells/heal.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 11) {
            return (
                <Image
                    source={require("../Images/spells/smite.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 3) {
            return (
                <Image
                    source={require("../Images/spells/exhaust.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 1) {
            return (
                <Image
                    source={require("../Images/spells/cleans.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 6) {
            return (
                <Image
                    source={require("../Images/spells/ghost.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell1 == 12) {
            return (
                <Image
                    source={require("../Images/spells/tp.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
    }

    _getSpells2() {
        if (this.spell2 == 14) {
            return (
                <Image
                    source={require("../Images/spells/ignite.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )

        }
        if (this.spell2 == 4) {
            return (
                <Image
                    source={require("../Images/spells/flash.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 7) {
            return (
                <Image
                    source={require("../Images/spells/heal.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 11) {
            return (
                <Image
                    source={require("../Images/spells/smite.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 3) {
            return (
                <Image
                    source={require("../Images/spells/exhaust.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 1) {
            return (
                <Image
                    source={require("../Images/spells/cleans.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 6) {
            return (
                <Image
                    source={require("../Images/spells/ghost.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
        if (this.spell2 == 12) {
            return (
                <Image
                    source={require("../Images/spells/tp.png")}
                    style={{ flex: 1, width: 45, height: 45 }}
                />
            )
        }
    }
    
    _typeGame = () => {
        if (game.queue == 400) {
            return (
                <Text>5v5 Draft</Text>               
                    )
        }
        if (game.queue == 420) {
            return (
                <Text>5v5 Ranked</Text>
            )
        }
        if (game.queue == 440) {
            return (
                <Text>5v5 Flex</Text>
            )
        }
    }

    _affiche_time() {
        return (
            <Text>{Math.trunc(this.gameDuration/60)}min</Text>
            )
    }

    _affiche_result = () => {
        if (this.win == true && Math.trunc(this.gameDuration / 60) > 4) {
            return (
                <Text>Victory</Text>
            )
        }
        else if (this.win == false && Math.trunc(this.gameDuration / 60) > 4) {
            return (
                <Text>Defeat</Text>
            )
        }
        else {
            return (
                <Text>Remake</Text>
            )
        }
    }

    _affiche_items(item) {
        if (item != 0) {
            return (
                <View>
                    <Image
                        style={{ borderRadius: 10, width: 20, height: 20, marginLeft: 1, marginRight: 1 }}
                        source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/' + this.ddragonVersion + '/img/item/' + item + '.png' }}
                    />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Image
                        style={{ borderRadius: 10, width: 20, height: 20, marginLeft: 1, marginRight: 1 }}
                        source={require("../Images/item_none/none.png")}
                    />
                </View>
                )
        }
    }

    _affiche_Score = () => {
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, letterSpacing: -1 }}>
                    <Text style={{ color: "#494F4F", fontWeight: "bold" }} >{this.kills}</Text>
                    <Text style={{ color: "#555E5E" }}> /</Text>
                    <Text style={{ color: "#C6443E", fontWeight: "bold" }}> {this.deaths}</Text>
                    <Text style={{ color: "#555E5E" }}> /</Text>
                    <Text style={{ color: "#494F4F", fontWeight: "bold" }}> {this.assists}</Text>
            </Text>
            </View>
        )
    }

    _affiche_KDA = () => {
        if (this.deaths == 0) {
            return (
                <Text>Perfect KDA</Text>
                )
        }
        else {

            return (
                <Text>{((this.kills + this.assists) / this.deaths).toFixed(2)}</Text>
            )
        }
    }

    _affiche_kills = () => {
        if (this.doubleKills != 0 || this.tripleKills != 0 || this.quadraKills != 0 || this.pentaKills != 0) {
            if (this.pentaKills != 0) {
                return (
                    <Text style={{ height: 14, width: 55, textAlign: "center", color: "white", fontSize: 10, letterSpacing: -0.5, backgroundColor: "#C6443E", borderWidth: 1, borderRadius: 20, borderColor: "#C6443E" }}>Penta Kill</Text>
                )
            }
            else if (this.quadraKills != 0) {
                return (
                    <Text style={{ height: 14, width: 55, textAlign: "center", color: "white", fontSize: 10, letterSpacing: -0.5, backgroundColor: "#C6443E", borderWidth: 1, borderRadius: 20, borderColor: "#C6443E" }}>Quadra Kill</Text>
                )
            }
            else if (this.tripleKills != 0) {
                return (
                    <Text style={{ height: 14, width: 55, textAlign: "center", color: "white", fontSize: 10, letterSpacing: -0.5, backgroundColor: "#C6443E", borderWidth: 1, borderRadius: 20, borderColor: "#C6443E" }}>Triple Kill</Text>
                )
            }
            else if (this.doubleKills != 0) {
                return (
                    <Text style={{ height: 14, width: 55, textAlign: "center", color: "white", fontSize: 10, letterSpacing: -0.5, backgroundColor: "#C6443E", borderWidth: 1, borderRadius: 20, borderColor: "#C6443E" }}>Double Kill</Text>
                )
            }
        }
        else {
            return (
                <Text> </Text>
                )
        }
    }

    _affiche_farm = () => {
        return (
            <Text style={{ fontSize: 13, color: "#555E5E" }}>{(this.totalMinionsKilled +  this.neutralMinionsKilledEnemyJungle + this.neutralMinionsKilledTeamJungle)} CS</Text>
            )
    }

    _affiche_level = () => {
        return (
            <Text style={{ fontSize: 12, color: "#555E5E"}}>Level{this.champLevel}</Text>
        )
    }

    _affiche_killParticipation = () => {
        if (isNaN(Math.round((this.kills + this.assists) / (this.killsId1 + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100))) {
            return (
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>P/Kill </Text>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: 0, fontWeight: "bold" }}>0</Text>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>%</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>P/Kill </Text>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: 0, fontWeight: "bold" }}>{Math.round((this.kills + this.assists) / (this.killsId1 + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100)}</Text>
                    <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>%</Text>
                </View>
            )
        }
    }

    _affiche_damageParticipation = () => {
        return (
            <View style={{ flex: 1, flexDirection: "row"}}>
                <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>P/Damage </Text>
                <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: 0, fontWeight: "bold" }}>{Math.round((this.totalDamageDealtToChampions) / (this.totalDamageDealtToChampions1 + this.totalDamageDealtToChampions2 + this.totalDamageDealtToChampions3 + this.totalDamageDealtToChampions4 + this.totalDamageDealtToChampions5) * 100)}</Text>
                <Text style={{ fontSize: 12, color: "#C6443E", letterSpacing: -1 }}>%</Text>
            </View>
        )
    }

    _affiche_visionScore = () => {
        return (
            <Text style={{ fontSize: 13, color: "#555E5E" }} >Vision {this.visionScore}</Text>
            )
    }

    _affiche_objectif_yesOrNo = (item) => {
        if (item == true) {
            return (
                <Image
                    style={{ justifyContent: 'flex-end', width: 10, height: 10, marginRight: 1.5, marginTop: 1}}
                    source={require("../Images/validate/yes.png")}
                />
                )
        }
        else {
            return (
                <Image
                    style={{ justifyContent: 'flex-end', width: 10, height: 10, marginRight: 1.5, marginTop: 1}}
                    source={require("../Images/validate/no.png")}
                />
                )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state != prevState && this.props.variableForChart.nbItems < 10) {
            if (this.win == true)
                this.props.dispatch({
                    type: "ADD_VAR", one_more: this.props.variableForChart.nbItems + 1,
                    one_more_eliminating: this.props.variableForChart.nbEliminating + this.kills + this.assists,
                    one_more_time: this.props.variableForChart.nbTime + Math.trunc(this.gameDuration / 60),
                    one_more_survivability: this.props.variableForChart.nbSurvivability + this.deaths,
                    one_more_objectives: this.props.variableForChart.nbObjectives + this.number_objectives,
                    one_more_victorious: this.props.variableForChart.nbVictorious + 1,
                    one_more_vision: this.props.variableForChart.nbVision + this.visionScore,
                    one_more_supporting: this.props.variableForChart.nbSupporting + (Math.round((this.kills + this.assists) / (this.killsId1 + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100))
                })
            else
                this.props.dispatch({
                    type: "ADD_VAR", one_more: this.props.variableForChart.nbItems + 1,
                    one_more_eliminating: this.props.variableForChart.nbEliminating + this.kills + this.assists,
                    one_more_time: this.props.variableForChart.nbTime + Math.trunc(this.gameDuration / 60),
                    one_more_survivability: this.props.variableForChart.nbSurvivability + this.deaths,
                    one_more_objectives: this.props.variableForChart.nbObjectives + this.number_objectives,
                    one_more_victorious: this.props.variableForChart.nbVictorious + 0,
                    one_more_vision: this.props.variableForChart.nbVision + this.visionScore,
                    one_more_supporting: this.props.variableForChart.nbSupporting + (Math.round((this.kills + this.assists) / (this.killsId1 + this.killsId2 + this.killsId3 + this.killsId4 + this.killsId5) * 100))
                })
                }
    }
 

    componentDidMount() {
        this._isMounted = true
        this._getInfoGame()
        this._getLasVersionddragon()
    }

    componentWillUnmount() {
        this._isMounted = false 
    }
   
    render() {
        game = this.props.game
        if (this.state.tout_est_ok) {
            return (
                <View style={this.win == true ? { flexDirection: 'row', backgroundColor: '#A3CFEC' } : { flexDirection: 'row', backgroundColor: '#e2b6b3' }}>
                    {/*container gauche image + spells */}
                    <View style={styles.container_left}>
                        <Image
                            style={styles.container_image_champion}
                            source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + game.champion + '.png' }}
                        />
                        <View style={styles.container_summs_spell}>
                            <View style={styles.container_summs_spell1}>{this._getSpells1()}</View>
                            <View style={styles.container_summs_spell2}>{this._getSpells2()}</View>
                        </View>
                    </View>
                    {/*container droit info de la partie en général*/}
                    <View style={styles.container_right}>
                        <View style={this.win == true ? styles.container_top_win : styles.container_top_defeat}>
                            <Text style={{ flex: 1, textAlign: "center" }}>{this._typeGame()}</Text>
                            <Text style={{ flex: 1, textAlign: "center" }}>{this._affiche_result()}</Text>
                            <Text style={{ flex: 1, textAlign: "center" }}>{this._affiche_time()}</Text>
                        </View>
                        <View style={styles.container_board_resume}>
                            <View style={styles.containerr_KDA_items}>

                                <View style={styles.container_scores}>
                                    <View style={{ flex: 2 }}>
                                    </View>
                                    <View style={{ flex: 1}}>
                                        {this._affiche_Score()}
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{this._affiche_KDA()}</Text>
                                            <Text style={{color: "#555E5E" }}> KDA</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row",  justifyContent: 'center'}}>
                                        {this._affiche_kills()}
                                    </View>
                                    <View style={{ flex: 1 }}/>
                                </View>
                                <View style={styles.container_items1}>
                                    {this._affiche_items(this.item0)}
                                    {this._affiche_items(this.item1)}
                                    {this._affiche_items(this.item2)}
                                    {this._affiche_items(this.item6)}
                                </View>
                                <View style={styles.container_items2}>
                                    {this._affiche_items(this.item3)}
                                    {this._affiche_items(this.item4)}
                                    {this._affiche_items(this.item5)}
                                </View>
                            </View>
                            {/*  partie avec les stats perso par rapport à la teams*/}
                            <View style={styles.container_stats_jeu}>
                                <View style={{ flex: 1 }} />
                                <Text style={{ flex: 1 }}>{this._affiche_level()}</Text>
                                <Text style={{ flex: 1 }}>{this._affiche_farm()}</Text>
                                {this._affiche_killParticipation()}
                                {this._affiche_damageParticipation()}
                                <Text style={{ flex: 1 }}>{this._affiche_visionScore()}</Text>
                            </View>
                            {/* partie de séparation*/}
                            <View
                                style={this.win == true ? { width: 1, height: "100%", backgroundColor: "#4aa1d2", marginLeft: "1%", marginRight: "1%" } : { width: 1, height: "100%", backgroundColor: "#d67b77", marginLeft: "1%", marginRight: "1%"}}
                            />
                            {/*  partie avec les objectifs d'afficher (tower, first kill, dragons etc)*/}
                            <View style={styles.container_info_objc}>
                                <View style={{ flex: 1 }} />
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{ justifyContent: 'flex-start', fontSize: 10, marginLeft: 2, color: "#555E5E" }}>First Blood </Text>
                                    {this._affiche_objectif_yesOrNo(this.firstBlood)}
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{ justifyContent: 'flex-start', fontSize: 10, marginLeft: 2, color: "#555E5E" }}>First Tower </Text>
                                    {this._affiche_objectif_yesOrNo(this.firstTower)}
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{ justifyContent: 'flex-start', fontSize: 10, marginLeft: 2, color: "#555E5E" }}>First Dragon </Text>
                                    {this._affiche_objectif_yesOrNo(this.firstDragon)}
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{ justifyContent: 'flex-start', fontSize: 10, marginLeft: 2, color: "#555E5E" }}>First Herald </Text>
                                    {this._affiche_objectif_yesOrNo(this.firstRiftHerald)}
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{ justifyContent: 'flex-start', fontSize: 10, marginLeft: 2, color: "#555E5E" }}>First Inhibitor </Text>
                                    {this._affiche_objectif_yesOrNo(this.firstInhibitor)}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount,
        variableForChart: state.variableForChart,
    }
}



const styles = StyleSheet.create({
    container_left: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
    },
    container_right: {
        flex: 3,
    },
    container_image_champion: {
        width: 90,
        height: 90,
    },
    container_summs_spell: {
        flexDirection: "row"
    },
    container_top_win: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#64b1e4",
        borderBottomWidth: 1,
        borderBottomColor: "#4aa1d2",

    },
    container_top_defeat: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#e89d99",
        borderBottomWidth: 1,
        borderBottomColor: "#d67b77",
    },
    container_board_resume: {
        flex:1,
        flexDirection: "row",
    },
    container_KDA_items: {
        flex: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    container_info_objct: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center",
        
    },
    container_stats_jeu: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    container_scores: {
        flex: 8,
    },
    container_items1: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
    },
    container_items2: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 2
    }
})

export default connect(mapStateToProps)(LoadHistorique)