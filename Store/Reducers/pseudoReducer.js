const initialState = {
    pseudo: ""
}

function pseudoSelect(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'PSEUDO_SELECT':
            console.log(action.value);
            if (action.value === 1)
                nextState = {
                    pseudo: true
                }
            else
                nextState = {
                    pseudo: false
                }
            return nextState
        default:
            return state
    }
}

export default pseudoSelect