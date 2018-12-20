import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { connect } from 'react-redux'
import { getInfoMatchByMatchId } from "../API/LolAPI"

class LoadHistorique extends React.Component {
    constructor(props) {
        super(props)
            this.championName= "",
                this.state = {
                componentMounted: false,
                participantId: 0, //participantIdentities.participantId
                win: false, //teams[0].win
                firstBlood: false, //teams[0].firstBlood
                firstTower: false,
                firstDragon: false,
                firstRiftHerald: false, 
            }
    }

    //recup les infos de la game
    _getInfoGame(){
        var i = 0
        if (game.gameId != 0) {
            getInfoMatchByMatchId(game.gameId, this.props.dataAccount.serverUsed).then(data => {
                while (i < 10 && data.participantIdentities[i] !== undefined) {
                    if (this.props.dataAccount.pseudoUsed == data.participantIdentities[i].player.summonerName) {
                        this.setState({
                            participantId: data.participantIdentities[i].participantId,
                        })
                        i = 11
                    }
                    i++
                }
            })
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

    _affiche_playerId = () => {
        return (
            <Text>{this.state.participantId}</Text>
            )
    }

    render() {
        game = this.props.game
        console.log("-------------")
        console.log(game)
        console.log("-------------")
        return (
            <View style={styles.container_all}>
                {/*container gauche image + mode de jeu*/}
                <View style={styles.container_left}>
                    <Image
                        style={styles.container_image}
                        source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + game.champion + '.png' }}
                    />
                    <View style={styles.container_mode}>
                        <Text>{this._typeGame()}</Text>
                    </View>
                </View>
                <View style={styles.container_right}>
                    <View>
                        <Text>{this._affiche_playerId()}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount
    }
}


const styles = StyleSheet.create({
    container_left: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        //left: 4,
    },
    container_mode: {
        justifyContent: 'center',
        //alignItems: 'center',
    },
    container_image: {
        width: 90,
        height: 90,
        //borderRadius: 50,

    },
    container_right: {
        flex: 3
    },
    container_all: {
        flexDirection: 'row'
    },
    container_objectifs: {
        flex: 1
    }
   
})

export default connect(mapStateToProps)(LoadHistorique)