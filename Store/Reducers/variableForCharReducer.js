const initialState = {
  nbVictorious: 0,
  nbVision: 0,
  nbSurvivability: 0,
  nbSupporting: 0,
  nbObjectives: 0,
  nbTime: 0,
  nbItems: 0,
  nbEliminating: 0,
};

function variableForChart(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_VAR':
      nextState = {
        nbVictorious: action.one_more_victorious,
        nbVision: action.one_more_vision,
        nbSurvivability: action.one_more_survivability,
        nbSupporting: action.one_more_supporting,
        nbObjectives: action.one_more_objectives,
        nbTime: action.one_more_time,
        nbItems: action.one_more,
        nbEliminating: action.one_more_eliminating,
      };
      return nextState;
    default:
      return state;
  }
}

export default variableForChart;
