import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function Detalle(props) {
    const { data } = props;
    const classes = useStyles();

    const rows = Object.values(data);
    const getTotal = () => {
        var total = 0;
        rows.map(o => total += (parseFloat(o.precio) * o.cantidad));
        return total.toFixed(2);
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="center">Precio</TableCell>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="center">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.nombre}
                            </TableCell>
                            <TableCell align="center">Bs. {row.precio}</TableCell>
                            <TableCell align="center">{row.cantidad}</TableCell>
                            <TableCell align="center">Bs. {row.precio * row.cantidad}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={1} />
                        <TableCell colSpan={1} align="center" >Total</TableCell>
                        <TableCell rowSpan={1} />
                        <TableCell align="center">Bs. {getTotal()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}