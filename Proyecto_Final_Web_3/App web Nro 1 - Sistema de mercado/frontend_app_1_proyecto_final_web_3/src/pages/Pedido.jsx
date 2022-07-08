import React from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Model from '../Model';
import { Button } from '@material-ui/core';

export default function Pedido(props) {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        estado: "cargando"
    });

    const denied = (msn) => {
        // navigate("/")
        state.estado = "error";
        state.error = msn;
        setState({ ...state })
        return false;
    }
    const verify = async () => {
        await new Promise(r => setTimeout(r, 1000));
        const carrito = JSON.parse(sessionStorage.getItem("carrito") ?? "{}");
        const direccion = JSON.parse(sessionStorage.getItem("direccion") ?? "{}");
        const empresa = JSON.parse(sessionStorage.getItem("empresa") ?? "{}");
        var token = sessionStorage.getItem("token");
        if (!token) return denied("No hay token de usuario")
        const usuario = jwt_decode(token);
        var total = 0;
        var pedido_detalle = Object.values(carrito).map((obj) => {
            total += parseFloat(obj.precio) * parseInt(obj.cantidad);
            return {
                producto_id: parseInt(obj.id),
                cantidad: parseInt(obj.cantidad),
                precio: parseFloat(obj.precio),
                descripcion: obj.nombre
            }
        })

        if (!pedido_detalle.length) return denied("No hay pedidos")
        if (!direccion.latitude && direccion.longitude) alert("No hay direccion de envio")
        if (!empresa.id) return denied("No hay empresa")
        if (!usuario.userId) return denied("No hay usuario")

        var objToSend = {
            monto_total: total,
            usuario_id: usuario.userId,
            username: usuario.username,
            entrega_obj: {
                latitude_origen: empresa.latitude,
                longitude_origen: empresa.longitude,
                latitude_destino: direccion.latitude,
                longitude_destino: direccion.longitude
            },
            pedido_detalle_obj: pedido_detalle
        }
        console.log(objToSend)

        Model.Pedido.registro(objToSend).then(e => {
            sessionStorage.removeItem("carrito")
            sessionStorage.removeItem("direccion")
            sessionStorage.removeItem("empresa")
            state.estado = "exito";
            console.log(e)
            setState({ ...state })
        }).catch(e => {
            state.estado = "error";
            state.error = e;
            setState({ ...state })
        })

    }
    React.useEffect(() => {
        verify();
    }, [])

    const getContent = () => {
        if (state.estado == "exito") {
            return <>
                <img src={require("../assets/compra_exitosa.gif")} />
                <Button variant="contained" onClick={() => {
                    navigate("/")
                }}>Salir</Button>
            </>
        }
        if (state.estado == "error") {
            return <>
                <label>{JSON.stringify(state.error)}</label>
                <Button variant="contained" onClick={() => {
                    navigate("/")
                }}>Salir</Button>
            </>
        }
        return <label>loading...</label>
    }

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {getContent()}
        </div>
    )
}
