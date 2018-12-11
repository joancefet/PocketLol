import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect } from 'react-redux'
import WarningFromStart from "./WarningFromStart"

class CurrentGame extends React.Component {
    state = {
    }

    _afficheCurrentGamePage() {
        if (this.props.pseudoValide) {
            return (
                <View style={styles.launch_page}>
                    <Text>CurrentGame page</Text>
                </View>
            )
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

                {/* On gère l'affichage de la page CurrentGame suivant si l'utilisateur a rentrer un pseudo ou pas*/}
                <WarningFromStart />
                {this._afficheCurrentGamePage()}
                {/* ------------------------------- */}

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

export default connect(mapStateToProps)(CurrentGame)