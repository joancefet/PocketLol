import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect } from 'react-redux'

class WarningFromStart extends React.Component {

    _warningFromStart() {
        if (this.props.pseudoValide === false) {
            return (
                <View style={styles.launch_page}>
                    <Text>You need to add a League of Legends account to continue !</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this._warningFromStart()}
            </View>
            )
    }
}

const styles = StyleSheet.create({
    launch_page: {
        alignContent: "center"
    }
})

const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide
    }
}

export default connect(mapStateToProps)(WarningFromStart)