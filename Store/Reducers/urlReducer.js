const initialState = {
  urlLink: '',

};

function url(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_NEW_URL':
      nextState = {
        urlLink: action.new_url,
      };
      return nextState;
    default:
      return state;
  }
}

export default url;
