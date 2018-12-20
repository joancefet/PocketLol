import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { connect } from 'react-redux'
import { getMatchsByAccountId } from "../API/LolAPI"

class LoadGame extends React.Component {
    constructor(props) {
        super(props)
        this.index10 = 5,
            this.state = {
                games: [],
            }
    }

    _loadHistoriqueAll = () => {
        getMatchsByAccountId(this.props.dataAccount.accountIdUsed, this.props.dataAccount.serverUsed, this.index10).then(data => {
            var i = 0
            this.setState({ games: [] })
            while (i < 5) {
                this.setState({
                    games: [...this.state.games, data.matches[i]]
                })
                i++
            }
            console.log(this.state.games)
            console.log("-----------------")
            console.log(this.state.games)
            console.log(this.state.games.length)
            console.log("-----------------")
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                {this._loadHistoriqueAll}
                <Text>Ok</Text>
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

export default connect(mapStateToProps)(LoadGame)