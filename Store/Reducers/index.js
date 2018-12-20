import { combineReducers } from 'redux'
import pseudoValide from "./pseudoValideReducer"
import dataAccount from "./dataAccountReducer"

export default combineReducers({
    pseudoValide,
    dataAccount
})