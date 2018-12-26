import React from "react"
import { View, Text, StyleSheet, Picker, Image, Alert, ScrollView } from "react-native"
import { connect } from 'react-redux'

class RankImage extends React.Component {

    _affiche_image(tier, rank) {
        if (tier == "DIAMOND") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "http://image.noelshack.com/fichiers/2018/44/7/1541363500-" + tier.toLowerCase() + "-" + rank.toLowerCase() + ".png" }}
                />
            )
        }
        else if (tier == "PLATINUM") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "http://image.noelshack.com/fichiers/2018/44/7/1541364005-" + tier.toLowerCase() + "-" + rank.toLowerCase() + ".png" }}
                />
            )
        }
        else if (tier == "GOLD") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "http://image.noelshack.com/fichiers/2018/44/7/1541363971-" + tier.toLowerCase() + "-" + rank.toLowerCase() + ".png" }}
                />
            )
        }
        else if (tier == "SILVER") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "http://image.noelshack.com/fichiers/2018/44/7/1541363928-" + tier.toLowerCase() + "-" + rank.toLowerCase() + ".png" }}
                />
            )
        }
        else if (tier == "BRONZE") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "http://image.noelshack.com/fichiers/2018/44/7/1541363816-" + tier.toLowerCase() + "-" + rank.toLowerCase() + ".png" }}
                />
            )
        }
        else if (tier == "MASTER") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require("../Images/tier-icons/master.png")}
                />
            )
        }
        else if (tier == "CHALLENGER") {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require("../Images/tier-icons/challenger.png")}
                />
            )
        }
        else {
            return (
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require("../Images/tier-icons/unranked.png")}
                />
                
                )
        }
    }

    render() {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {this._affiche_image(this.props.tier, this.props.rank)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
})


const mapStateToProps = (state) => {
    return {
        pseudoValide: state.pseudoValide,
        dataAccount: state.dataAccount
    }
}

export default connect(mapStateToProps)(RankImage)