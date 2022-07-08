import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import BarraTop from '../../components/BarraTop';
import Model from '../../Model';
import Detalle from './Detalle';


export default function Carrito(props) {
    const navigate = useNavigate();
    const [state, setState] = React.useState({});
    const carrito = JSON.parse(sessionStorage.getItem("carrito") ?? "{}");

    React.useEffect(() => {

    }, [])


    return (
        <>
            <BarraTop title={"Carrito"} />
            <h1>Carrito de compras</h1>
            <Detalle data={carrito} />
            <br />
            <Grid xs={12} style={{
                textAlign: "center"
            }}>
                <Button variant="contained" onClick={() => {
                    console.log(state.region)
                    if (!Model.Usuario.getToken()) {
                        navigate("/login")
                        return;
                    }
                    navigate("/direccion")
                }}>Comprar</Button>
            </Grid>
        </>
    )
}
