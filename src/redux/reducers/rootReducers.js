import currencyReducer from './currency.reducer'
import {combineReducers} from 'redux'


const rootReducers = combineReducers({
    currency: currencyReducer,
})

export default rootReducers