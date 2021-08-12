import {NavLink} from "react-router-dom";


/*------Styles---*/
import {makeStyles } from '@material-ui/core/styles';
import {homeStyle} from './home.style'

/*------UI Components----*/
import {Container, Button, CircularProgress} from '@material-ui/core';

/*------Components-----*/
import {TableComponent} from "../../components/home/table.component";


/*-----Interface----*/
import {IDataCurrency} from "../../utils/interfaces";


// @ts-ignore
const useStyles = makeStyles(homeStyle);


export default function Home({data, loading}:{data:IDataCurrency[], loading: boolean}){
    const classes = useStyles();

    return(
        <Container style={{position: 'relative'}}>
            {
                loading?(<div>
                    <div className={classes.circleProgress}>
                        <CircularProgress />
                    </div>
                </div>):(<></>)
            }
            <div style={loading?{opacity:'0.5'}:{}}>
                <TableComponent data={data} />
            </div>

            <NavLink to="/converter">
                <Button variant="contained" color="primary">
                    Converter
                </Button>
            </NavLink>
        </Container>

    )
}