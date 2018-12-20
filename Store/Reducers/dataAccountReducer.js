const initialState = {
    pseudoUsed: "",
    idUsed: 0,
    accountIdUsed: 0,
    serverUsed: ""
}

function dataAccount(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_INFO_ACCOUNT':
            nextState = {
                pseudoUsed: action.textPseudo,
                idUsed: action.textId,
                accountIdUsed: action.textAccountId,
                serverUsed: action.textServerUsed
            }
            return nextState
        default:
            return state
    }
}

export default dataAccount