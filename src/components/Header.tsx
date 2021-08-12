import {useState} from "react";

/*------Styles----*/
import { makeStyles } from '@material-ui/core/styles';
import {headerStyle} from './header.style'


/*-----UI Components----*/
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Typography, FormControl, Select, InputLabel} from '@material-ui/core';

/*-----Constants----*/
import {currency_arr} from "../utils/constants";

const useStyles = makeStyles(headerStyle);


export function Header({currency, setCurrency}:{currency:string, setCurrency:(value:string)=>void}){
    const classes = useStyles();

    const [state, setState] = useState({
        currency: ''
    });


    /*-------Handler Functions ------*/



    const handleChange = (event) => {
        const name = event.target.name;
        setCurrency(event.target.value)
        setState({
            ...state,
            [name]: event.target.value,
        });
    };


    return(
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Currency Converter
                    </Typography>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-currency-native-simple" className={classes.label}>Currency</InputLabel>
                            <Select
                                native
                                className={`select-currency`}
                                value={currency}
                                onChange={handleChange}
                                label="Currency"
                                inputProps={{
                                    name: 'currency',
                                    id: 'outlined-currency-native-simple',
                                }}
                            >
                                {
                                    currency_arr.map((item, index)=>(
                                        <option value={item} key={index}>{item}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}