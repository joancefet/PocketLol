const initialState = {
    server: "EUW"
}

function serverSelect(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SERVER_SELECT':
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

export default serverSelect