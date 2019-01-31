const initialState = {
  gamesNumber: 0,

};

function gamesNumber(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_GAMES_NUMBER':
      nextState = {
        gamesNumber: action.gamesNumber,
      };
      return nextState;
    default:
      return state;
  }
}

export default gamesNumber;
