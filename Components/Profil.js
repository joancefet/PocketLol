import React from "react"
import { View, Text, StyleSheet } from "react-native"
import ActionButton from 'react-native-action-button'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"


class Profil extends React.Component {
    state = {
        popupVisible: false,
    }

    //--------------- Section Popup pseudo
    _showPopup = () => {
        this.setState({ popupVisible: true })
    }

    _informationPopup = () => {
        // le user a cliquer sur le bouton valider mes infos, ici on recup les infos
        const action = { type: "PSEUDO_IS_VALIDE", value: 1 }
        this.props.dispatch(action)
        this.setState({ popupVisible: false })
    }
    _cancelPopup = () => {
        this.setState({ popupVisible: false });
    }
    //----------------------------------------------


    _afficheProfilPage() {
        if (this.props.pseudoValide) {
            return (
                <View style={styles.launch_page}>
                    <Text>Profil page</Text>
                </View>
            )
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

                {/* On gère l'affichage de la page Profil suivant si l'utilisateur a rentrer un pseudo ou pas*/}
                <WarningFromStart/>
                {this._afficheProfilPage()}
                {/* ------------------------------- */}

                <Dialog.Container visible={this.state.popupVisible}>
                    <Dialog.Title>League of Legends Account</Dialog.Title>
                    <Dialog.Input label="Pseudo :" />
                    <Dialog.Input label="Serveur (EUW, NA, KR ..) :" />
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
   
})

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide
    }
}

export default connect(mapStateToProps)(Profil)