const initialState = {
    pseudoValide: false
}

function pseudoValide(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'PSEUDO_IS_VALIDE':
            if (action.value === 1)
                nextState = {
                    pseudoValide: true
                }
            return nextState
        case 'PSEUDO_IS_INVALIDE':
            if (action.value === -1)
                nextState = {
                    pseudoValide: false
                }
            return nextState
        default:
            return state
    }
}

export default pseudoValide