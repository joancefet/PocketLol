import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class WarningFromStart extends React.Component {
  warningFromStart() {
    if (this.props.pseudoValide.pseudoValide === false) {
      return (
        <View style={styles.launch_page}>
          <Text style={styles.text_param}>
            You need to add a League of Legends account to continue !
          </Text>
        </View>
      );
    }
    return (<View />);
  }

  render() {
    return (
      <View>
        { this.warningFromStart() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  launch_page: {
    left: '8%',
    marginTop: '60%',
    width: 300,
  },
  text_param: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  pseudoValide: state.pseudoValide,
});

export default connect(mapStateToProps)(WarningFromStart);
