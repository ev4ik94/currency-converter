

export function setCurrency(currency){
    return async function (dispatch){
        dispatch({type:'set_currency', payload: currency})
    }
}