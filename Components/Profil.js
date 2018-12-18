import React from "react"
import { View, Text, StyleSheet, Picker, Image, Alert } from "react-native"
import ActionButton from 'react-native-action-button'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"
import { getSummonerBySummonerName, getLeageBySummonerId } from "../API/LolAPI"

const Item = Picker.Item


class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: "",
            summonerLevel: 0,
            profileIconId: 0,
            accountId: 0,
            id: 0,
            //----------------
            queueTypeSolo: "",
            hotStreakSolo: false,
            winsSolo: 0,
            veteranSolo: false,
            lossesSolo: 0,
            leagueNameSolo: "",
            inactiveSolo: false,
            rankSolo: "",
            freshBloodSolo: false,
            leagueIdSolo: "",
            tierSolo: "",
            leaguePointsSolo: 0,
            //---------------
            popupVisible: false,
            server: "EUW1",
        }
    }

    _resetAllpreviousVariable() {
        this.setState({
            pseudo: "",
            summonerLevel: 0,
            profileIconId: 0,
            accountId: 0,
            id: 0,
            queueTypeSolo: "",
            hotStreakSolo: false,
            winsSolo: 0,
            veteranSolo: false,
            lossesSolo: 0,
            leagueNameSolo: "",
            inactiveSolo: false,
            rankSolo: "",
            freshBloodSolo: false,
            leagueIdSolo: "",
            tierSolo: "",
            leaguePointsSolo: 0,
            server: "EUW1",
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
        getSummonerBySummonerName(this.state.pseudo, this.state.server).then(data => {
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
                    id: data.id
                })
                const action = { type: "PSEUDO_IS_VALIDE", value: 1 }
                this.props.dispatch(action)
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
        getLeageBySummonerId(this.state.id).then(data => {
            var i = 0;
            while (i < 3) {
                if (data[i] !== undefined) {
                    if (data[i].queueType === "RANKED_SOLO_5x5") {
                        this.setState({
                            queueTypeSolo: data[i].queueType,
                            hotStreakSolo: data[i].hotStreak,
                            winsSolo: data[i].wins,
                            veteranSolo: data[i].veteran,
                            lossesSolo: data[i].losses,
                            leagueNameSolo: data[i].leagueName,
                            inactiveSolo: data[i].inactive,
                            rankSolo: data[i].rank,
                            freshBloodSolo: data[i].freshBlood,
                            leagueIdSolo: data[i].leagueId,
                            tierSolo: data[i].tier,
                            leaguePointsSolo: data[i].leaguePoints
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

    _onFire() {
        if (this.state.hotStreakSolo === true) {
            return (
                <Text> You are currently on fire !!</Text>
                )
        }
        else
            return (
                <Text>You need to rise..</Text>
                )
    }


    _afficheProfilPage() {
        if (this.props.pseudoValide) {
            return (
                <View style={styles.launch_page}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/' + this.state.profileIconId + '.png'}}
                    />
                    <Text>Pseudo : {this.state.pseudo}</Text>
                    <Text>Level : {this.state.summonerLevel}</Text>
                    <Text>Id : {this.state.id}</Text>
                    <Text>On fire ? : {this._onFire()}</Text>
                    <Text>Tier : {this.state.tierSolo}</Text>
                    <Text>Rank : {this.state.rankSolo}</Text>
                    <Text>Points : {this.state.leaguePointsSolo}</Text>
                </View>
            )
        }
    }

    render() {
        //console.log(this.props);
        console.log(this.state);

        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

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
                    size={65}
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
    }
   
})

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        //pseudo: state.pseudo,
        //server: state.server
    }
}

export default connect(mapStateToProps)(Profil)