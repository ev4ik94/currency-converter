import React from 'react';
import {Switch,Route} from "react-router-dom";


/*------Pages------*/
import Home from './home/Home'
import Converter from "./converter/Converter";

/*-----Interface----*/
import {IDataCurrency} from "../utils/interfaces";

function Routing({data, loading, setCurrency}:{data:IDataCurrency[], loading: boolean, setCurrency:(value:string)=>void}){
    return(

        <Switch>

            <Route path="/converter">
                <Converter setCurrency={setCurrency} />
            </Route>

            <Route path="/" exact  >
                <Home data={data} loading={loading}/>
            </Route>

        </Switch>

    )
}

export default Routing;