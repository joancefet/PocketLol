import React from 'react';
import {
  Animated, View, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

class PolarChart extends React.Component {
  constructor() {
    super();
    this.isMounted = false;
    //
    this.state = {
      elim: '100%',
      vic: '100%',
      surv: '100%',
      vision: '100%',
      supp: '100%',
      obj: '100%',
      nbEliminating: 0,
      nbVictorious: 0,
      nbSurvivability: 0,
      nbVision: 0,
      nbSupporting: 0,
      nbObjectives: 0,
    };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.variableForChart.nbTime !== prevProps.variableForChart.nbTime) {
      this.test();
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  calculateAverageScore() {
    const z = (this.state.nbEliminating + this.state.nbObjectives
      + this.state.nbSupporting + this.state.nbSurvivability
      + this.state.nbVictorious + this.state.nbVision) / 6;
    return z.toFixed(1);
  }

  test() {
    this.functionEliminating();
    this.functionSurvivability();
    this.functionVictorious();
    this.functionVision();
    this.functionSupporting();
    this.functionObjectives();
  }

  functionEliminating() {
    let x = this.props.variableForChart.nbEliminating / 10;
    const time = this.props.variableForChart.nbTime / 10;
    if (x / time >= 0.7) { x = 100; } else if (x / time
      >= 0.65) { x = 90; } else if (x / time >= 0.6) { x = 80; } else if (x / time
        >= 0.55) { x = 70; } else if (x / time >= 0.50) { x = 60; } else if (x / time
          >= 0.45) { x = 50; } else if (x / time >= 0.4) { x = 40; } else if (x / time
            >= 0.3) { x = 30; } else if (x / time >= 0.2) { x = 20; } else if (x / time
              >= 0.1) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ elim: x, nbEliminating: y });
  }

  functionSurvivability() {
    let x = this.props.variableForChart.nbSurvivability / 10;
    const time = this.props.variableForChart.nbTime / 10;
    if (x / time <= 0.06) { x = 100; } else if (x / time
      <= 0.1) { x = 90; } else if (x / time <= 0.16) { x = 80; } else if (x / time
        <= 0.2) { x = 70; } else if (x / time <= 0.23) { x = 60; } else if (x / time
          <= 0.3) { x = 50; } else if (x / time <= 0.4) { x = 40; } else if (x / time
            <= 0.5) { x = 30; } else if (x / time <= 0.6) { x = 20; } else if (x / time
              <= 0.7) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ surv: x, nbSurvivability: y });
  }

  functionVictorious() {
    let x = this.props.variableForChart.nbVictorious / 10;
    if (x === 1) { x = 100; } else if (x >= 0.9) { x = 90; } else if (x
      >= 0.8) { x = 80; } else if (x >= 0.7) { x = 70; } else if (x
        >= 0.6) { x = 60; } else if (x >= 0.5) { x = 50; } else if (x
          >= 0.4) { x = 40; } else if (x === 0.3) { x = 30; } else if (x
            >= 0.2) { x = 20; } else if (x >= 0.1) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ vic: x, nbVictorious: y });
  }

  functionVision() {
    let x = this.props.variableForChart.nbVision / 10;
    const time = this.props.variableForChart.nbTime / 10;
    if (x / time >= 1.2) { x = 100; } else if (x / time
      >= 0.91) { x = 90; } else if (x / time >= 0.81) { x = 80; } else if (x / time
        >= 0.7) { x = 70; } else if (x / time >= 0.60) { x = 60; } else if (x / time
          >= 0.50) { x = 50; } else if (x / time >= 0.43) { x = 40; } else if (x / time
            >= 0.35) { x = 30; } else if (x / time >= 0.27) { x = 20; } else if (x / time
              >= 0.2) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ vision: x, nbVision: y });
  }

  functionSupporting() {
    let x = this.props.variableForChart.nbSupporting / 10;
    if (x >= 78) { x = 100; } else if (x >= 64) { x = 90; } else if (x
      >= 54) { x = 80; } else if (x >= 47) { x = 70; } else if (x
        >= 40) { x = 60; } else if (x >= 34) { x = 50; } else if (x
          >= 27) { x = 40; } else if (x >= 20) { x = 30; } else if (x
            >= 15) { x = 20; } else if (x >= 10) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ supp: x, nbSupporting: y });
  }

  functionObjectives() {
    let x = this.props.variableForChart.nbObjectives / 10;
    if (x >= 4.5) { x = 100; } else if (x >= 4) { x = 90; } else if (x
      >= 3.5) { x = 80; } else if (x >= 3) { x = 70; } else if (x
        >= 2.7) { x = 60; } else if (x >= 2.4) { x = 50; } else if (x
          >= 2) { x = 40; } else if (x >= 1.5) { x = 30; } else if (x
            >= 1) { x = 20; } else if (x >= 0.5) { x = 10; } else { x = 0; }
    const y = x / 10;
    x = x.toString();
    x = `${x}%`;
    this.setState({ obj: x, nbObjectives: y });
  }

  render() {
    if (this.props.variableForChart.nbItems === 10 && this.props.gamesNumber.gamesNumber > 9) {
      return (
        <View style={styles.container}>
          <Text style={styles.container_text}>Eliminating</Text>
          <View style={styles.bar_container}>
            {this.state.elim
              && (
              <Animated.View style={[styles.bar, styles.cont_elim, { width: this.state.elim }]} />
              )
            }
            <Text style={styles.container_text_count}>{this.state.nbEliminating}</Text>
          </View>
          <Text style={styles.container_text}>Survivability</Text>
          <View style={styles.bar_container}>
            {this.state.surv
            && <Animated.View style={[styles.bar, styles.cont_surv, { width: this.state.surv }]} />
            }
            <Text style={styles.container_text_count}>{this.state.nbSurvivability}</Text>
          </View>
          <Text style={styles.container_text}>Victorious</Text>
          <View style={styles.bar_container}>
            {this.state.vic
            && <Animated.View style={[styles.bar, styles.cont_vic, { width: this.state.vic }]} />
            }
            <Text style={styles.container_text_count}>{this.state.nbVictorious}</Text>
          </View>
          <Text style={styles.container_text}>Supporting</Text>
          <View style={styles.bar_container}>
            {this.state.supp
            && <Animated.View style={[styles.bar, styles.cont_supp, { width: this.state.supp }]} />
            }
            <Text style={styles.container_text_count}>{this.state.nbSupporting}</Text>
          </View>
          <Text style={styles.container_text}>Objectives</Text>
          <View style={styles.bar_container}>
            {this.state.obj
            && <Animated.View style={[styles.bar, styles.cont_obj, { width: this.state.obj }]} />
            }
            <Text style={styles.container_text_count}>{this.state.nbObjectives}</Text>
          </View>
          <Text style={styles.container_text}>Vision</Text>
          <View style={styles.bar_container}>
            {this.state.vision
            && <Animated.View style={[styles.bar, styles.cont_vis, { width: this.state.vision }]} />
            }
            <Text style={styles.container_text_count}>{this.state.nbVision}</Text>
          </View>
          <View style={styles.container_rating}>
            <Text style={styles.rating}>Rating: </Text>
            <Text style={styles.score}>
              {this.calculateAverageScore()}
            </Text>
            <Text style={styles.bareme}>
/10
            </Text>
          </View>
          <View>
            <Text style={styles.info_text}>* on the last 10 games played.</Text>
          </View>
        </View>
      );
    }
    if (this.props.gamesNumber.gamesNumber < 10 && this.props.gamesNumber.gamesNumber >= 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.error_message}>
You dont have played enought games to have an analys of your account...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
        <Text />
        <Text style={styles.games_played}>analysing your last 10 games</Text>
      </View>
    );
  }
}

const colorRed = '#F55443';
const colorGreen = '#F6DA4F';
const colorBlue = '#F97E5D';
const colorOrange = '#10AC2C';
const colorYellow = '#0AAFCD';
const colorViolet = '#BE77D3';
const colorScore = '#F4D03F';
const colorText = '#555E5E';
const styles = StyleSheet.create({
  bar: {
    borderRadius: 5,
    height: 9,
  },
  bar_container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 1,
  },
  bareme: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: -0.4,
    marginLeft: 2,
  },
  cont_elim: {
    backgroundColor: colorRed,
  },
  cont_obj: {
    backgroundColor: colorGreen,
  },
  cont_supp: {
    backgroundColor: colorBlue,
  },
  cont_surv: {
    backgroundColor: colorOrange,
  },
  cont_vic: {
    backgroundColor: colorYellow,
  },
  cont_vis: {
    backgroundColor: colorViolet,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 20,
    marginTop: 10,
  },
  container_rating: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  container_text: {
    color: colorText,
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 0,
  },
  container_text_count: {
    color: colorText,
    fontSize: 11,
    marginLeft: 3,
    marginTop: -3,
  },
  error_message: {
    color: colorText,
    fontSize: 11,
    left: '8%',
    marginTop: '25%',
    textAlign: 'center',
    width: 300,
  },
  games_played: {
    color: colorText,
    fontSize: 11,
    textAlign: 'center',
  },
  info_text: {
    color: colorText,
    fontSize: 10,
  },
  loading_container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    marginTop: 50,
    right: 0,
    top: 0,
  },
  rating: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  score: {
    color: colorScore,
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: -1,
    marginTop: -11,
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
  dataAccount: state.dataAccount,
  variableForChart: state.variableForChart,
  gamesNumber: state.gamesNumber,
});


export default connect(mapStateToProps)(PolarChart);
