import React from "react"
import { View, Text, StyleSheet, Picker, Image, Alert, ScrollView } from "react-native"
import { connect } from 'react-redux'

class EnteteProfil extends React.Component {

    render () {
        return (
            <View style={styles.container_entete}>
                <Image
                    style={{ flex: 1.2, marginTop: 5, marginBottom: 5, width: 100, height: 100 }}
                    source={require("../Images/cup/cup.png")}
                />
                <View style={{ flex: 1}}>
                    <Image
                        style={{ width: 100, height: 100, borderWidth: 1,  borderColor: "#EABD53" }}
                        source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + this.props.image + '.jpg' }}
                    />
                    <Text style={{ width: 100, textAlign: "center", color: "#EABD53", fontSize: 12, letterSpacing: -0.2, backgroundColor: "#2C3548", borderWidth: 1, borderRadius: 20, borderColor: "#EABD53", marginTop: -7 }}>{this.props.dataAccount.pseudoUsed}</Text>

                </View>
               
                <Image
                    style={{ flex: 1.2, marginTop: 5, marginBottom: 5, width: 100, height: 100 }}
                    source={require("../Images/cup/cup.png")}
                />
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container_entete: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center"
    }
})


const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount,
        nbItems: state.nbItems,
        nbEliminating: state.nbEliminating,
    }
}

export default connect(mapStateToProps)(EnteteProfil)