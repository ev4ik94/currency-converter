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
import {API_CONVERTER, currency_arr} from "./utils/constants";


/*------Interface----*/
import {IDataCurrency} from "./utils/interfaces";


function App({currency, setCurrency}:{currency:string, setCurrency:(value:string)=>void}) {


  let is_mount = true
    const {request, loading} = AxiosApi()
    const [data, setData] = useState<IDataCurrency[]>([])


    useEffect(()=>{
        if(is_mount){
            getValueCurrencyAll()
        }
        return ()=>{
            is_mount = false
        }

    }, [])


    useEffect(()=>{
        getValueCurrencyAll()
    }, [currency])

    /*------ Update values every 15 sec ----*/

    useEffect(()=>{
        const interval = setInterval(()=>{
            getValueCurrencyAll()
        }, 15000);

        return ()=> clearInterval(interval)
    }, [currency])




    /*-------Handler Functions ------*/


    const getValueCurrencyAll = async()=>{

        let arr_data:IDataCurrency[] = []
        Promise
            .all(currency_arr.map(item=>{
                if(item!==currency){
                    return getConvertCurrency(item, arr_data)
                }
            }))
            .then(() => {
                setData(arr_data)
            })
            .catch(ex => console.error(ex));
    }


    const getConvertCurrency = async(currency_l, arr)=>{

       await request(`${API_CONVERTER}?base=${currency_l}&symbols=${currency}`)
            .then(result=>{
                arr.push({
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
          <Routing data={data} loading={loading} setCurrency={setCurrency}/>
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
