import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"
import { getMatchsByAccountId } from "../API/LolAPI"
import { TouchableOpacity } from 'react-native'
import LoadHistorique from "./LoadHistorique"

class Historique extends React.PureComponent {
    constructor(props) {
        super(props)
        this.index10 = 100
        this._isMounted = false
        this.state = {
            games: [],
        }
    }

    //on récupère toutes les games
    _loadHistoriqueAll = () => {
        if (this._isMounted) {
            this.props.dispatch({ type: "ADD_GAMES_NUMBER", gamesNumber: -1 })
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                //this.setState({ games: [] })
                this.props.dispatch({ type: "ADD_GAMES_NUMBER", gamesNumber: 0 })
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.props.dispatch({ type: "ADD_GAMES_NUMBER", gamesNumber: games_tempo.length })
                this.setState({ games: games_tempo })
            })
        }
    }

    //on récupère les games ou le joueur joue MID
    _loadHistoriqueMid = () => {
        if (this._isMounted) {
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].lane == "MID" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.setState({ games: games_tempo })
            })
        }
    }

    //on récupère les games ou le joueur joue TOP
    _loadHistoriqueTop = () => {
        if (this._isMounted) {
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].lane == "TOP" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.setState({ games: games_tempo })
            })
        }
    }

    //on récupère les games ou le joueur joue JUNGLE
    _loadHistoriqueJungle = () => {
        if (this._isMounted) {
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].lane == "JUNGLE" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.setState({ games: games_tempo })
            })
        }
    }

    //on récupère les games ou le joueur joue bottom
    _loadHistoriqueBot = () => {
        if (this._isMounted) {
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].role == "DUO_CARRY" && data.matches[i].lane == "BOTTOM"
                                && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.setState({ games: games_tempo })
            })
        }
    }

    //on récupère les games ou le joueur joue support
    _loadHistoriqueSup = () => {
        if (this._isMounted) {
            getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                var j = 0
                var games_tempo = []
                this.state.games.length = 0
                while (i < 100 && j < 20) {
                    if (typeof (data.matches) !== 'undefined') {
                        if (typeof (data.matches[i]) !== 'undefined') {
                            if (data.matches[i].role == "DUO_SUPPORT" && data.matches[i].lane == "BOTTOM"
                                && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                                games_tempo = [...games_tempo, data.matches[i]]
                                j++
                            }
                        }
                    }
                    else
                        i = 100
                    i++
                }
                this.setState({ games: games_tempo })
            })
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 3,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    //marginLeft: "14%"
                }}
            />
        )
    }

    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View>
                <Text style={styles.list_empty}>Couldn't load history, the player has not played since a while...</Text>
            </View>
        )
    }

    //fait parti de ma FlatList, mis ici pour optimiser le temps d'affichage
    renderItem = ({ item }) => (<LoadHistorique game={item} />);

    _afficheHistoriquePage() {
        if (this.props.pseudoValide.pseudoValide && this.props.dataAccount.accountIdUsed != 0) {
            return (
                <View style={styles.launch_page}>
                    <View style={styles.historique}>
                        <FlatList
                            style={styles.flatlist_histo}
                            data={this.state.games}
                            keyExtractor={(item) => item.gameId.toString()}
                            //on créé notre props game qui contient nos items (un item = une game) qu'on envoit à notre component LoadHistorique
                            //renderItem={({ item }) => <LoadHistorique game={item} />}
                            renderItem={this.renderItem}
                            initialNumToRender={20}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={this.ListEmpty}
                            removeClippedSubviews={true}
                        />
                    </View>

                    <View style={styles.list_roles}>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueAll}
                        >
                            <Image
                                source={require("../Images/roles/all_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueTop}
                        >
                            <Image
                                source={require("../Images/roles/top_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueJungle}
                        >
                            <Image
                                source={require("../Images/roles/jungle_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueMid}
                        >
                            <Image
                                source={require("../Images/roles/mid_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueSup}
                        >
                            <Image
                                source={require("../Images/roles/sup_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueBot}
                        >
                            <Image
                                source={require("../Images/roles/adc_but.png")}
                                style={{ width: 60, height: 60, flex: 1 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dataAccount.accountIdUsed !== prevProps.dataAccount.accountIdUsed) {
            this.state.games.length = 0
            this.props.dispatch({ type: "ADD_VAR", one_more: 0, one_more_eliminating: 0, one_more_time: 0, one_more_survivability: 0, one_more_objectives: 0, one_more_victorious: 0, one_more_vision: 0, one_more_supporting: 0 })
            this._loadHistoriqueAll()
        }
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
                {/* On gère l'affichage de la page d'historique suivant si l'utilisateur a rentrer un pseudo ou pas*/}
                <WarningFromStart />
                {this._afficheHistoriquePage()}
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        launch_page: {
            flex: 1,
        },
        list_roles: {
            flex: 0.83,
            flexDirection: 'row',
            justifyContent: "space-around",
            //borderTopWidth: 1,
            backgroundColor: "#CED0CE"
        },
        historique: {
            flex: 8,
        },
        flatlist_histo: {
        },
        list_empty:
        {
            left: "8%",
            marginTop: "60%",
            width: 300,
            textAlign: 'center',
            fontSize: 18,
        },
})

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount,
        variableForChart: state.variableForChart,
        gamesNumber: state.gamesNumber,
    }
}


export default connect(mapStateToProps)(Historique)