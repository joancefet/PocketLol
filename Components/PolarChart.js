import React from 'react';
import { Animated, Component, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'

class PolarChart extends React.Component {
  
    constructor() {
        super()
        this._isMounted = false
        //
        this.state = {
            eliminating: "100%",
            victorious:"100%",
            survivability: "100%",
            vision: "100%",
            supporting:  "100%",
            objectives: "100%",
            nbEliminating: 0,
            nbVictorious: 0,
            nbVurvivability: 0,
            nbVision: 0,
            nbVupporting: 0,
            nbObjectives: 0,
        }
    }

    function_eliminating() {
        var x = this.props.variableForChart.nbEliminating / 10
        var time = this.props.variableForChart.nbTime / 10
        if (x / time >= 0.9)
            x = 100
        else if (x / time >= 0.78)
            x = 90
        else if (x / time >= 0.7)
            x = 80
        else if (x / time >= 0.63)
            x = 70
        else if (x / time >= 0.53)
            x = 60
        else if (x / time >= 0.46)
            x = 50
        else if (x / time >= 0.4)
            x = 40
        else if (x / time >= 0.3)
            x = 30
        else if (x / time >= 0.2)
            x = 20
        else if (x / time >= 0.1)
            x = 10
        else
            x = 0
        y = x / 10
        x = x.toString()
        x = x + "%"
        this.setState({ eliminating: x, nbEliminating: y })
    }

    function_survivability() {
        var x = this.props.variableForChart.nbSurvivability / 10
        var time = this.props.variableForChart.nbTime / 10
        if (x / time <= 0.06)
            x = 100
        else if (x / time <= 0.1)
            x = 90
        else if (x / time <= 0.16)
            x = 80
        else if (x / time <= 0.2)
            x = 70
        else if (x / time <= 0.23)
            x = 60
        else if (x / time <= 0.3)
            x = 50
        else if (x / time <= 0.4)
            x = 40
        else if (x / time <= 0.5)
            x = 30
        else if (x / time <= 0.6)
            x = 20
        else if (x / time <= 0.7)
            x = 10
        else
            x = 0
        y = x / 10
        x = x.toString()
        x = x + "%"
        this.setState({ survivability: x, nbSurvivability: y })
    }

    function_victorious() {
        var x = this.props.variableForChart.nbVictorious / 10
        if (x  == 1)
            x = 100
        else if (x >= 0.9)
            x = 90
        else if (x  >= 0.8)
            x = 80
        else if (x  >= 0.7)
            x = 70
        else if (x  >= 0.6)
            x = 60
        else if (x  >= 0.5)
            x = 50
        else if (x >= 0.4)
            x = 40
        else if (x = 0.3)
            x = 30
        else if (x  >= 0.2)
            x = 20
        else if (x  >= 0.1)
            x = 10
        else
            x = 0
        y = x / 10
        x = x.toString()
        x = x + "%"
        this.setState({ victorious: x, nbVictorious: y })
    }

    function_vision() {
        var x = this.props.variableForChart.nbVision / 10
        var time = this.props.variableForChart.nbTime / 10
        if (x / time >= 1.2)
            x = 100
        else if (x / time >= 0.91)
            x = 90
        else if (x / time >= 0.81)
            x = 80
        else if (x / time >= 0.7)
            x = 70
        else if (x / time >= 0.60)
            x = 60
        else if (x / time >= 0.50)
            x = 50
        else if (x / time >= 0.43)
            x = 40
        else if (x / time >= 0.35)
            x = 30
        else if (x / time >= 0.27)
            x = 20
        else if (x / time >= 0.2)
            x = 10
        else
            x = 0
        y = x / 10
        x = x.toString()
        x = x + "%"
        this.setState({ vision: x, nbVision: y })
    }

    function_supporting() {
        var x = this.props.variableForChart.nbSupporting / 10
        if (x  >= 85)
            x = 100
        else if (x >= 75)
            x = 90
        else if (x  >= 66)
            x = 80
        else if (x >= 56)
            x = 70
        else if (x >= 48)
            x = 60
        else if (x >= 41)
            x = 50
        else if (x >= 35)
            x = 40
        else if (x >= 27)
            x = 30
        else if (x >= 20)
            x = 20
        else if (x >= 10)
            x = 10
        else
            x = 0
        y = x / 10
        x = x.toString()
        x = x + "%"
        this.setState({ supporting: x, nbSupporting: y })
    }

    function_objectives() {
        var x = this.props.variableForChart.nbObjectives / 10
            if (x >= 4.5)
                x = 100
            else if (x >= 4)
                x = 90
            else if (x >= 3.5)
                x = 80
            else if (x >= 3)
                x = 70
            else if (x >= 2.7)
                x = 60
            else if (x >= 2.4)
                x = 50
            else if (x >= 2)
                x = 40
            else if (x >= 1.5)
                x = 30
            else if (x >= 1)
                x = 20
            else if (x >= 0.5)
                x = 10
            else
                x = 0
            y = x / 10
            x = x.toString()
        x = x + "%"
        this.setState({ objectives: x, nbObjectives: y })
    }

    calculate_averageScore() {
        z = (this.state.nbEliminating + this.state.nbObjectives + this.state.nbSupporting + this.state.nbSurvivability + this.state.nbVictorious + this.state.nbVision)/6
        return z.toFixed(1)
    }

    test() {
        this.function_eliminating()
        this.function_survivability()
        this.function_victorious()
        this.function_vision()
        this.function_supporting()
        this.function_objectives()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.variableForChart.nbTime != prevProps.variableForChart.nbTime) {
            this.test()
        }

    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        if (this.props.variableForChart.nbItems == 10 && this.props.gamesNumber.gamesNumber > 9) {
            return (
                <View style={styles.container}>
                    <Text style={styles.container_text}>Eliminating</Text>
                    <View style={styles.bar_container}>
                        {this.state.eliminating &&
                            <Animated.View style={[styles.bar, styles.container_eliminating, { width: this.state.eliminating }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbEliminating}</Text>
                    </View>
                    <Text style={styles.container_text}>Survivability</Text>
                    <View style={styles.bar_container}>
                        {this.state.survivability &&
                            <Animated.View style={[styles.bar, styles.container_survivability, { width: this.state.survivability }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbSurvivability}</Text>
                    </View>
                    <Text style={styles.container_text}>Victorious</Text>
                    <View style={styles.bar_container}>
                        {this.state.victorious &&
                            <Animated.View style={[styles.bar, styles.container_victorious, { width: this.state.victorious }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbVictorious}</Text>
                    </View>
                    <Text style={styles.container_text}>Supporting</Text>
                    <View style={styles.bar_container}>
                        {this.state.supporting &&
                            <Animated.View style={[styles.bar, styles.container_supporting, { width: this.state.supporting }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbSupporting}</Text>
                    </View>
                    <Text style={styles.container_text}>Objectives</Text>
                    <View style={styles.bar_container}>
                        {this.state.objectives &&
                            <Animated.View style={[styles.bar, styles.container_objectives, { width: this.state.objectives }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbObjectives}</Text>
                    </View>
                    <Text style={styles.container_text}>Vision</Text>
                    <View style={styles.bar_container}>
                        {this.state.vision &&
                            <Animated.View style={[styles.bar, styles.container_vision, { width: this.state.vision }]} />
                        }
                        <Text style={styles.container_text_count}>{this.state.nbVision}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>Rating: </Text>
                        <Text style={{
                            fontSize: 35, letterSpacing: -1, color: "#F4D03F", marginTop: -11, fontWeight: "bold", fontStyle: "italic"
                        }}>{this.calculate_averageScore()}</Text>
                        <Text style={{ fontSize: 20, letterSpacing: -0.4, fontWeight: "bold", fontStyle: "italic", marginLeft: 2 }}>/10</Text>
                    </View>
                    <View>
                        <Text style={{ color: "#555E5E", fontSize: 10 }}>* on the last 10 games played.</Text>
                    </View>
                </View>
            )
        }
        else if (this.props.gamesNumber.gamesNumber < 10 && this.props.gamesNumber.gamesNumber >= 0) {
            return (
                <View style={styles.container}>
                    <Text style={{
                        textAlign: "center", color: "#555E5E", fontSize: 11, left: "8%", marginTop: "25%", width: 300}}>You don't have played enought games to have an analys of your account...</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.loading_container}>
                        <ActivityIndicator size='large' />
                    </View>
                    <Text></Text>
                    <Text style={{ textAlign: "center", color: "#555E5E", fontSize: 11 }}>analysing your last 10 games</Text>
                </View>
                )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 20,
    },
    loading_container: {
        marginTop: 50,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Bar
    bar_container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 1,
    },
    bar: {
        borderRadius: 5,
        height: 9,
    },
    container_eliminating: {
        backgroundColor: '#F55443'
    },
    container_victorious: {
        backgroundColor: '#0AAFCD'
    },
    container_supporting: {
        backgroundColor: '#F97E5D'
    },
    container_survivability: {
        backgroundColor: '#10AC2C'
    },
    container_vision: {
        backgroundColor: '#BE77D3'
    },
    container_objectives: {
        backgroundColor: '#F6DA4F'
    },
    container_text: {
        color: "#555E5E",
        fontSize: 11,
        marginTop: 0,
        letterSpacing: 0.5
    },
    container_text_count: {
        color: "#555E5E",
        fontSize: 11,
        marginLeft: 3,
        marginTop: -3,
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


export default connect(mapStateToProps)(PolarChart)