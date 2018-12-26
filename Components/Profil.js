import React from "react"
import { View, Text, StyleSheet, Picker, Image, Alert, ScrollView } from "react-native"
import ActionButton from 'react-native-action-button'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"
import { getSummonerBySummonerName, getLeageBySummonerId, getMatchsByAccountId } from "../API/LolAPI"
import EnteteProfil from "./entete_profil"
import RankImage from "./rank_image"
import PolarChart from "./PolarChart"

const Item = Picker.Item


class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.index10 = 10,
        this.state = {
            games: [],
            pseudo: "",
            summonerLevel: 0,
            profileIconId: 0,
            accountId: 0,
            id: 0,
            //-----------SOLO
            hotStreakSolo: false,
            winsSolo: 0,
            veteranSolo: false,
            lossesSolo: 0,
            rankSolo: "",
            tierSolo: "",
            leaguePointsSolo: 0,
            //----------FLEX
            hotStreakFlex: false,
            winsFlex: 0,
            veteranFlex: false,
            lossesFlex: 0,
            rankFlex: "",
            tierFlex: "",
            leaguePointsFlex: 0,
            //---------------
            popupVisible: false,
            server: "EUW1",
        }
    }

    _resetAllpreviousVariable() {
        this.setState({
            summonerLevel: 0,
            profileIconId: 0,
            accountId: 0,
            id: 0,
            //-----------SOLO
            hotStreakSolo: false,
            winsSolo: 0,
            veteranSolo: false,
            lossesSolo: 0,
            rankSolo: "",
            tierSolo: "",
            leaguePointsSolo: 0,
            //----------FLEX
            hotStreakFlex: false,
            winsFlex: 0,
            veteranFlex: false,
            lossesFlex: 0,
            rankFlex: "",
            tierFlex: "",
            leaguePointsFlex: 0,
        })
    }

    //On récupère la saisie du pseudo
    _searchTextInputChanged = (text) => {
        this.setState({ pseudo: text })
    }


    //on récupère les infos du profil via le pseudo
    _loadSummoner() {
        //on reset toute les variables pour repartir sur un nouveau profil et ne pas garder les infos des profils précédents en mémoire.
        this._resetAllpreviousVariable()
        //appel API League of legends
        getSummonerBySummonerName(this.state.pseudo, this.state.server).then(data => {
            //on verifie que le profil existe sur l'api et on recup les champs qui nous interesse
            if (data.name === undefined) {
                Alert.alert("Pseudo incorrect")
                const action = { type: "PSEUDO_IS_INVALIDE", value: -1 }
                this.props.dispatch(action)
            }
            else {
                this.setState({
                    summonerLevel: data.summonerLevel,
                    profileIconId: data.profileIconId,
                    accountId: data.accountId,
                    id: data.id,
                    pseudo: data.name
                })
                const action = { type: "PSEUDO_IS_VALIDE", value: 1 }
                this.props.dispatch(action)
                //on ajoute les variables pseudo, id, accountId & server dans le store sous le nom de pseudoUsed et serverUsed. Comme ça on y a accès dans tout nos components
                this.props.dispatch({ type: "ADD_INFO_ACCOUNT", textPseudo: this.state.pseudo, textId: this.state.id, textAccountId: this.state.accountId, textServerUsed: this.state.server })
            }
        })
    }

    //on vérifie que le state a été update et l'appli re-rendu
   
    componentDidUpdate(prevProps, prevState) {
        if (this.state.id !== prevState.id)
            this._loadLeague()
        
    }

    //on récupère les infos du profil via l'id du compte
    _loadLeague() {
        getLeageBySummonerId(this.state.id, this.state.server).then(data => {
            var i = 0;
            while (i < 3) {
                if (data[i] !== undefined) {
                    if (data[i].queueType === "RANKED_SOLO_5x5") {
                        this.setState({
                            hotStreakSolo: data[i].hotStreak,
                            winsSolo: data[i].wins,
                            veteranSolo: data[i].veteran,
                            lossesSolo: data[i].losses,
                            rankSolo: data[i].rank,
                            tierSolo: data[i].tier,
                            leaguePointsSolo: data[i].leaguePoints
                        })
                    }
                    if (data[i].queueType == "RANKED_FLEX_SR") {
                        this.setState({
                            hotStreakFlex: data[i].hotStreak,
                            winsFlex: data[i].wins,
                            veteranFlex: data[i].veteran,
                            lossesFlex: data[i].losses,
                            rankFlex: data[i].rank,
                            tierFlex: data[i].tier,
                            leaguePointsFlex: data[i].leaguePoints
                        })
                    }
                }
                i++;
            }
        })
    }

    _updateServer = (server) => {
        this.setState({ server: server })
    }

    //--------------- Section Popup pseudo
    _showPopup = () => {
        this.setState({ popupVisible: true })
    }

    _informationPopup = () => {
         // le user a cliquer sur le bouton valider mes infos, ici on recup les infos
        // On verifie que le pseudo existe !
        this._loadSummoner()
        this.setState({ popupVisible: false })
    }
    _cancelPopup = () => {
        this.setState({ popupVisible: false });
    }
    //----------------------------------------------

    _bonus_streak(streak) {
        if (streak === true) {
            return (
                <Text style={{
                    height: 16, width: 45, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#42B289",
                    borderWidth: 1, borderRadius: 4, borderColor: "#42B289", marginLeft: 1, marginRight: 1
                }}
                >on fire</Text>
                )
        }
    }

    _bonus_winrate(winrate, totalGames) {
        if (winrate >= 60) {
            return (
                <Text style={{
                    height: 16, width: 55, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#42B289",
                    borderWidth: 1, borderRadius: 4, borderColor: "#42B289", marginLeft: 1, marginRight: 1
                }}
                >smurfing</Text>
            )
        }
        if (winrate < 60 && winrate >= 54) {
            return (
                <Text style={{
                    height: 16, width: 35, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#42B289",
                    borderWidth: 1, borderRadius: 4, borderColor: "#42B289", marginLeft: 1, marginRight: 1
                }}
                >good</Text>
            )
        }
        if (winrate < 49 && winrate > 45 && totalGames > 40) {
            return (
                <Text style={{
                    height: 16, width: 40, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#E74C3C",
                    borderWidth: 1, borderRadius: 4, borderColor: "#E74C3C", marginLeft: 1, marginRight: 1
                }}
                >icare</Text>
            )
        }
        if (winrate <= 45 && totalGames > 40) {
            return (
                <Text style={{
                    height: 16, width: 35, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#E74C3C",
                    borderWidth: 1, borderRadius: 4, borderColor: "#E74C3C", marginLeft: 1, marginRight: 1
                }}
                >bad</Text>
            )
        }
    }

    _bonus_veteran(veteran) {
        if (veteran === true) {
            return (
                <Text style={{
                    height: 16, width: 52, textAlign: "center", color: "white", fontSize: 11, letterSpacing: -0.1, backgroundColor: "#E74C3C",
                    borderWidth: 1, borderRadius: 4, borderColor: "#E74C3C", marginLeft: 1, marginRight: 1
                }}
                >veteran</Text>
            )
        }
    }

    _calcul_winratio(win, defeat) {
        if (isNaN(Math.round((win / (win + defeat)) * 100)))
            return "--"
        else
            return Math.round((win / (win + defeat)) * 100)
    }

    _unranked(tier) {
        if (tier == "")
            return "UNRANKED"
    }

    _affiche_SoloqRank() {
        return (
            <View style={{ flex: 1 }}>
                <RankImage tier={this.state.tierSolo} rank={this.state.rankSolo}/>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.tierSolo} {this.state.rankSolo}{this._unranked(this.state.tierSolo)}</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.leaguePointsSolo} LP</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.winsSolo}V {this.state.lossesSolo}D</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>SOLO Q</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Win Ratio {this._calcul_winratio(this.state.winsSolo, this.state.lossesSolo)}%</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                    {this._bonus_streak(this.state.hotStreakSolo)}
                    {this._bonus_winrate((Math.round((this.state.winsSolo / (this.state.winsSolo + this.state.lossesSolo)) * 100)), (this.state.winsSolo + this.state.lossesSolo))}
                    {this._bonus_veteran(this.state.veteranSolo)}
                    <Text> </Text>
                </View>
            </View>
            )
    }

    _affiche_FlexRank() {
        return (
            <View style={{ flex: 1, alignSelf: "center"}}>
                <RankImage tier={this.state.tierFlex} rank={this.state.rankFlex}/>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.tierFlex} {this.state.rankFlex}{this._unranked(this.state.tierFlex)}</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.leaguePointsFlex} LP</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>{this.state.winsFlex}V {this.state.lossesFlex}D</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>FLEX Q</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Win Ratio {this._calcul_winratio(this.state.winsFlex, this.state.lossesFlex)}%</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                    {this._bonus_streak(this.state.hotStreakFlex, (Math.round((this.state.winsFlex / (this.state.winsFlex + this.state.lossesFlex)) * 100)), this.state.veteranFlex, (this.state.winsFlex + this.state.lossesFlex))}
                    {this._bonus_winrate((Math.round((this.state.winsFlex / (this.state.winsFlex + this.state.lossesFlex)) * 100)), (this.state.winsFlex + this.state.lossesFlex))}
                    {this._bonus_veteran(this.state.veteranFlex)}
                    <Text> </Text>
                </View>
            </View>
        )
    }

    _afficheProfilPage() {
        if (this.props.pseudoValide.pseudoValide) {
            return (
                <View>
                    <ScrollView>
                        <EnteteProfil image={this.state.profileIconId} />
                        <View style={styles.container_rank}>
                            {this._affiche_SoloqRank()}
                            <View
                                style={{ width: 1, height: "60%", backgroundColor: "#555E5E", marginLeft: "1%", marginRight: "1%", alignSelf: "center" }}
                        />
                            {this._affiche_FlexRank()}
                        </View>
                        <PolarChart/>
                    </ScrollView>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>

                {/* On gère l'affichage de la page Profil suivant si l'utilisateur a rentrer un pseudo ou pas*/}
                <WarningFromStart/>
                {this._afficheProfilPage()}
                {/* ------------------------------- */}

                <Dialog.Container visible={this.state.popupVisible}>
                    <Dialog.Title>League of Legends Account</Dialog.Title>
                    <Dialog.Input
                        label="Pseudo :"
                        onChangeText={this._searchTextInputChanged}
                    />
                    <Text style={styles.picker_server_title}>Server :</Text>
                    <Picker
                        style={styles.picker_server}
                        selectedValue={this.state.server}
                        onValueChange={this._updateServer}
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
                    <Dialog.Button label="Cancel" onPress={this._cancelPopup} />
                    <Dialog.Button label="Enter" onPress={this._informationPopup} />
                </Dialog.Container>
                {/* ------------------------------- */}
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton
                    buttonColor="#3c82e7"
                    offsetX={20}
                    offsetY={20}
                    size={64}
                    onPress={this._showPopup}
                >
                </ActionButton>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    picker_server_title: {
        color: "grey",
        letterSpacing: 0.2,
        marginLeft: 9
    },
    picker_server: {
        marginLeft: 9
    },
    container_rank: {
        flex: 1,
        flexDirection: "row",
        marginTop: 8,
    }
   
})

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount,
        variableForChart: state.variableForChart,
        gamesNumber: state.gamesNumber,
    }
}

export default connect(mapStateToProps)(Profil)