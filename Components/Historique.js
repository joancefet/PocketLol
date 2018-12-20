import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"
import { getMatchsByAccountId } from "../API/LolAPI"
import { TouchableOpacity } from 'react-native'
import LoadHistorique from "./LoadHistorique"

class Historique extends React.Component {
    constructor(props) {
        super(props)
        this.index10 = 20,
        this.state = {
            games: [],
        }
    }

    //on récupère toutes les games
    _loadHistoriqueAll = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
                var i = 0
                this.setState({games: []})
                while (i < this.index10) {
                    if (data.matches[i].lane != "NONE" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                        this.setState({
                            games: [...this.state.games, data.matches[i]]
                        })
                    }
                i++
                }
                console.log("-----------------")
                console.log(this.state.games)
                console.log("-----------------")
            })
    }

    //on récupère les games ou le joueur joue MID
    _loadHistoriqueMid = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < this.index10) {
                if (data.matches[i].lane == "MID" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                    this.setState({
                        games: [...this.state.games, data.matches[i]]
                    })
                }
                i++
            }
            console.log("-----------------")
            console.log(this.state.games)
            console.log("-----------------")
        })
    }

    //on récupère les games ou le joueur joue TOP
    _loadHistoriqueTop = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < this.index10) {
                if (data.matches[i].lane == "TOP" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                    this.setState({
                        games: [...this.state.games, data.matches[i]]
                    })
                }
                i++
            }
            console.log("-----------------")
            console.log(this.state.games)
            console.log("-----------------")
        })
    }

    //on récupère les games ou le joueur joue JUNGLE
    _loadHistoriqueJungle = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < this.index10) {
                if (data.matches[i].lane == "JUNGLE" && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                    this.setState({
                        games: [...this.state.games, data.matches[i]]
                    })
                }
                i++
            }
            console.log("-----------------")
            console.log(this.state.games)
            console.log("-----------------")
        })
    }

    //on récupère les games ou le joueur joue bottom
    _loadHistoriqueBot = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < this.index10) {
                if (data.matches[i].role == "DUO_CARRY" && data.matches[i].lane == "BOTTOM"
                    && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                    this.setState({
                        games: [...this.state.games, data.matches[i]]
                    })
                }
                i++
            }
            console.log("-----------------")
            console.log(this.state.games)
            console.log("-----------------")
        })
    }

    //on récupère les games ou le joueur joue support
    _loadHistoriqueSup = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < this.index10) {
                if (data.matches[i].role == "DUO_SUPPORT" && data.matches[i].lane == "BOTTOM"
                    && (data.matches[i].queue == 400 || data.matches[i].queue == 420 || data.matches[i].queue == 440)) {
                    this.setState({
                        games: [...this.state.games, data.matches[i]]
                    })
                }
                i++
            }
            console.log("-----------------")
            console.log(this.state.games)
            console.log("-----------------")
        })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
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
                <Text style={styles.list_empty}>This is empty :o</Text>
            </View>
        )
    }

    _afficheHistoriquePage() {
        if (this.props.pseudoValide.pseudoValide) {
            return (
                <View style={styles.launch_page}>  
                    <View style={styles.historique}>
                        <FlatList
                            style={styles.flatlist_histo}
                            data={this.state.games}
                            keyExtractor={(item) => item.gameId.toString()}
                            //on créé notre props game qui contient nos items (un item = une game) qu'on envoit à notre component LoadHistorique
                            renderItem={({ item }) => <LoadHistorique game={item} />}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={this.ListEmpty}
                        />
                    </View>

                    <View style={styles.list_roles}>
                        <TouchableOpacity
                            onPress={this._loadHistoriqueAll}
                        >
                            <Image
                                source={require("../Images/roles/all_icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this._loadHistoriqueTop}
                        >
                            <Image
                                source={require("../Images/roles/Top_icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this._loadHistoriqueJungle}
                        >
                            <Image
                                source={require("../Images/roles/Jungle_icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this._loadHistoriqueMid}
                        >
                            <Image
                                source={require("../Images/roles/Mid_icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this._loadHistoriqueSup}
                        >
                            <Image
                                source={require("../Images/roles/Support_Icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this._loadHistoriqueBot}
                        >
                            <Image
                                source={require("../Images/roles/Bot_icon.png")}
                                style={{ width: 50, height: 50, flex: 1 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dataAccount.accountIdUsed !== prevProps.dataAccount.accountIdUsed) {
            this.setState({
                games: []
            })
            { this._loadHistoriqueAll() }
        }
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                {/* On gère l'affichage de la page d'historique suivant si l'utilisateur a rentrer un pseudo ou pas*/}
                <WarningFromStart />
                {this._afficheHistoriquePage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    launch_page: {
        flex: 1
    },
    list_roles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        borderTopWidth: 1,
    },
    historique: {
        flex: 8,
    },
    flatlist_histo: {
        //flex: 1
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
        dataAccount: state.dataAccount
    }
}

export default connect(mapStateToProps)(Historique)