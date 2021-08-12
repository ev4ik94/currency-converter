import {useEffect, useState} from "react";

/*----Styles-----*/
import './App.css';


/*-----Redux-----*/
import {connect} from 'react-redux'
import {setCurrency} from "./redux/actions/setCurrency.action";

/*-----Components----*/
import {Header} from "./components/Header";

/*-----Routing----*/
import {BrowserRouter} from 'react-router-dom';
import Routing from "./pages/Routing";
import {AxiosApi} from "./hooks/axios.hook";
import {API_CONVERTER, currency_arr} from "./constants";



function App({currency, setCurrency}) {


  let is_mount = true
    const {request, loading} = AxiosApi()

    const [data, setData] = useState([])
    let arr_data = []

    useEffect(()=>{
        if(is_mount){
            setCurrency('UZS')
        }
        return ()=>{
            is_mount = false
        }

    }, [])


    useEffect(()=>{
        if(currency!==''){
            getValueCurrencyAll()
        }
    }, [currency])

    /*------ Update values every 15 sec ----*/

    // useEffect(()=>{
    //     setInterval(()=>{
    //         getValueCurrencyAll()
    //     }, 15000)
    //
    //     clearInterval(()=>{
    //         getValueCurrencyAll()
    //     })
    // }, [])




    /*-------Handler Functions ------*/


    const getValueCurrencyAll = async()=>{
        Promise
            .all(currency_arr.map(item=>{
                if(item!==currency){
                    return getConvertCurrency(item)
                }
            }))
            .then((result) => {setData(arr_data)})
            .catch(ex => console.error(ex));
    }


    const getConvertCurrency = async(currency_l)=>{
        return await request(`${API_CONVERTER}?base=${currency_l}&symbols=${currency}`)
            .then(result=>{
                arr_data.push({
                    base: result.data.base,
                    date: result.data.date,
                    rates: result.data.rates
                })
            })
            .catch(e=>console.log(e))
    }



  return (
    <div className="App">
        <BrowserRouter keyLength={12}>
          <Header currency={currency} setCurrency={setCurrency}/>
          <Routing data={data} loading={loading}/>
        </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state=>({
    currency: state.currency
})

const mapDispatchToPRops = {
    setCurrency
}

export default connect(mapStateToProps, mapDispatchToPRops)(App);
