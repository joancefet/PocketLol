const initialState = { pseudoValide: false }

function pseudoValide(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'PSEUDO_IS_VALIDE':
            console.log(action.value);
            if (action.value === 1)
                nextState = {
                    pseudoValide: true
                }
            else
                nextState = {
                    pseudoValide: false
                }
            return nextState
        default:
            return state
    }
}

export default pseudoValide