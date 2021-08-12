

const currencyReducer = (state='UZS', action)=>{
    switch(action.type){
        case 'set_currency':
            return action.payload
        default:
            return state
    }
}

export default currencyReducer
