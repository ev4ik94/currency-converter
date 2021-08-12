import {useEffect, useState} from "react";

/*----Styles----*/
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {tableStyle, tableCell, tableRaw} from './table.style'


/*-----UI Components----*/
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';


/*----Redux----*/
import {useSelector} from 'react-redux'


/*---Interface----*/
import {IDataCurrency} from "../../utils/interfaces";

/*-----Functions---*/
import {decimalAdjust, costRepl} from "../handler-function";



const StyledTableCell = withStyles(tableCell)(TableCell);
const StyledTableRow = withStyles(tableRaw)(TableRow);
const useStyles = makeStyles(tableStyle);


function createData(num, currency, converter_value) {
    return { num, currency, converter_value};
}




export function TableComponent({data = []}:{data:IDataCurrency[]}){

    const classes = useStyles();
    const [rows, setRows] = useState([])
    const currency = useSelector((state:{currency:string})=>state.currency)

    useEffect(()=>{
console.log(currency)
        setRows(data.map((item, index)=>{
// console.log(item.rates)
            let value:number = decimalAdjust('round', item.rates[currency], -2)
            return createData(index+1, item.base, `${costRepl(value)} ${currency}`)
        }))
    }, [data])


    return (
        <TableContainer component={Paper} className={classes.containerTable}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">№</StyledTableCell>
                        <StyledTableCell align="left">Currency</StyledTableCell>
                        <StyledTableCell align="left">Value</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.num}>
                            <StyledTableCell align="left" component="th" scope="row">
                                {row.num}
                            </StyledTableCell>
                            <StyledTableCell align="left" component="th" scope="row">
                                {row.currency}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.converter_value}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}