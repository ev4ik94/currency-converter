

export function setCurrency(currency='UZS'){
    return async function (dispatch){
        dispatch({type:'set_currency', payload: currency})
    }
}