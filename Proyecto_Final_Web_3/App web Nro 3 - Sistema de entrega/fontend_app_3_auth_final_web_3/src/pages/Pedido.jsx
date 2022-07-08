import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';
import TableData from '../components/TableData';
import { Button, Container } from '@material-ui/core';
import Mapa from '../components/Mapa';
import Marker from '../components/Marker';


const Pedido = (props) => {
    const { id } = useParams()
    const [state, setState] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        Model.Pedido.getById(id).then((resp) => {
            state.pedido = resp;
            setState({ ...state })
        })
        Model.Entrega.getByIdPedido(id).then((resp) => {
            state.entrega = resp.find(o => o.pedido_id == id);
            Model.Rastreo.getByEntrega(state.entrega.id).then((r) => {
                state.rastreos = r;
                setState({ ...state })

            })
        })
    }, [])

    const getCrear = () => {
        if (!Model.Usuario.isRol(["superadmin", "entregaadmin"])) {
            return;
        }
        if (state.entrega.estado == 0) {
            return <Link to={`/pedido/aceptar/${state.entrega.id}`}>
                <Button>Aceptar</Button>
            </Link>
        } else if (state.entrega.estado == 1 || state.entrega.estado == 2) {
            return <><Link to={`/pedido/registro/${state.entrega.id}`}>
                <Button>Crear rastreo</Button>
            </Link>
                <Link to={`/pedido/terminar/${state.entrega.id}`}>
                    <Button>Terminar</Button>
                </Link>
            </>
        }
        return <p>Terminado</p>
    }
    const getLista = () => {
        if (state.entrega.estado == 0) return
        var arrOrder = state.rastreos;
        arrOrder = arrOrder.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))

        return <TableData header={[
            "id", "estado", "created_at", "latitude", "longitude", "nombre_ubicacion"
        ]} data={arrOrder}
            onSelect={(resp) => {
                if (resp.estado != "Envio En Camino") return;
                if (state.entrega.estado == 3) return;
                if (!Model.Usuario.isRol(["superadmin", "entregaadmin"])) {
                    return;
                }
                if (window.confirm(`Seguro que desea eliminar el rastreo ${resp.id}?`) == true) {
                    Model.Rastreo.eliminar(resp.id).then((e) => {
                        window.location.reload();
                    })
                }
            }}
        />
    }
    const getMarkers = (map, maps) => {
        return state.rastreos.map((obj) => {
            console.log(obj)
            return new maps.Marker({
                position: { lat: parseFloat(obj.latitude ?? 0), lng: parseFloat(obj.longitude ?? 0) },
                map,
                title: 'Hello World!'
            });
            // return marker;
            // return <Marker lat={parseFloat(obj.latitude)} lng={parseFloat(obj.longitude)} >
            //     <img src={require("../assets/marker.png")} width={30} height={30} />
            // </Marker>
        })
    }
    const getMapa = () => {
        if (state.entrega.estado == 0) return

        return <div style={{
            width: "100%",
            height: 400,
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa initialRegion={{ latitude: -17.77563056947456, longitude: -63.179435750067476 }} onGoogleApiLoaded={({ map, maps }) => {
                getMarkers(map, maps)
            }}>

            </Mapa>
        </div >
    }
    const getItem = () => {
        if (!state.pedido) return <h1>Loading</h1>
        if (!state.entrega) return <h1>Loading</h1>
        if (!state.rastreos) return <h1>Loading</h1>

        return <div>
            <p>{state.pedido.tracking_id}</p>
            <p>Usuario:  {state.pedido.username}</p>
            <p>Total:  Bs. {state.pedido.monto_total}</p>
            <p>Estado: {state.entrega.estado}</p>
            <p>Origen: {state.entrega.latitude_origen},{state.entrega.longitude_origen}</p>
            <p>Destino: {state.entrega.latitude_destino},{state.entrega.longitude_destino}</p>
            <hr />
            {getMapa()}

            <hr />
            {getCrear()}
            {getLista()}
        </div>
    }


    return (
        <>
            <Drawer title="Pedido">
                <Container>
                    {getItem()}

                </Container>
            </Drawer>
        </>
    )
}
export default Pedido;
