import {useState, useEffect} from "react";


/*-----Styles----*/
import { makeStyles } from '@material-ui/core/styles';
import {converterInputStyle} from "./converter-input.style";

/*------Functions----*/
import {decimalAdjust, costRepl} from "../handler-function";

/*------UI Components---*/
import {AppBar, Tabs, Tab, TextField, CircularProgress } from '@material-ui/core';

/*-----Redux----*/
import {useSelector} from "react-redux";

/*-----Hooks----*/
import {AxiosApi} from "../../hooks/axios.hook";


/*-----Constants-----*/
import {currency_arr} from "../../utils/constants";



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// @ts-ignore
const useStyles = makeStyles(converterInputStyle);


export function ConverterInputComponent({setCurrency}:{setCurrency:(value:string)=>void}){
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const currency = useSelector((state:{currency:string})=>state.currency)
    const [textFieldVal, setTextFieldVal] = useState('')
    const [resultConvert, setResultConvert] = useState([])

    const {request, loading} = AxiosApi()


    useEffect(()=>{
        convert()
    }, [textFieldVal, currency])

    async function convert (){
        await request(`https://api.exchangerate.host/latest?base=${currency}&symbols=${currency_arr.join(',')}&amount=${textFieldVal!==''?textFieldVal:0}`)
            .then(result=>{

                let arr = currency_arr.map(item=>{
                    let num = result.data.rates[item]
                    return `${costRepl(decimalAdjust('round', num, -2))} ${item}`

                })
                setResultConvert(arr)
            })
    }


    /*-----Handler functions-----*/
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrency(currency_arr[newValue])
    };

    function changeTextField(value){
        if(!value.match(/[A-z]/ig)){
            setTextFieldVal(value)
        }
    }




    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {
                        currency_arr.map((item, index)=>{
                            return(
                                <Tab label={item} {...a11yProps(index)} key={index}/>
                            )
                        })
                    }
                </Tabs>
            </AppBar>
            <div>
                <form className={classes.root} noValidate autoComplete="off" style={{marginTop: '15px'}}>
                    <TextField id="standard-basic" label={currency} className={classes.textField}
                               value={textFieldVal}
                               onChange={(e)=>changeTextField(e.target.value)}/>
                </form>
                <ul style={loading?{opacity: '0.5'}:{}} className={classes.containerList}>
                    {
                        loading?(<div className={classes.circleProgress}>
                            <CircularProgress />
                        </div>):(<></>)
                    }
                    {
                        resultConvert.map((item, index)=>{
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}