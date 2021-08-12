import {NavLink} from "react-router-dom";

/*------Styles---*/
import {makeStyles } from '@material-ui/core/styles';
import {converterStyle} from './converter.style'

/*-----Components----*/
import {ConverterInputComponent} from "../../components/converter/converter-input.component";

/*-----UI Components----*/
import {Container, Button} from '@material-ui/core'


const useStyles = makeStyles(converterStyle);



export default function Converter({setCurrency}:{setCurrency:(value:string)=>void}){
    const classes = useStyles();

    return(
        <Container>
            <div>
                <NavLink to={'/'}>
                    <Button className={classes.button} variant="outlined" color="primary">Back to Home</Button>
                </NavLink>
                <h1>Converter</h1>
                <ConverterInputComponent  setCurrency={setCurrency} />
            </div>
        </Container>
    )
}

