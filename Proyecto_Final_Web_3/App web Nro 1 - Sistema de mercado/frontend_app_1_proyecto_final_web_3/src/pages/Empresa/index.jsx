import { Container, Grid, List } from '@material-ui/core';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import BarraTop from '../../components/BarraTop';
import Mapa from '../../components/Mapa';
import Marker from '../../components/Marker';
import Model from '../../Model';
import ProductosPorCategoria from './ProductosPorCategoria';


export default function Empresa(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = React.useState({});
    const [carrito, setCarrito] = React.useState(JSON.parse(sessionStorage.getItem("carrito") ?? "{}"));

    React.useEffect(() => {
        Model.Empresa.getById(id).then((resp) => {
            setState({
                ...state,
                empresa: resp
            })
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const getEmpresa = () => {
        const dataEmpresa = state.empresa;
        if (!dataEmpresa) return <label>Loading...</label>
        return (<>
            <h2>{dataEmpresa.nombre}</h2>

            <div style={{
                width: "100%",
                height: 300,
            }}>
                <Mapa
                    initialRegion={{
                        latitude: parseFloat(dataEmpresa.latitude ?? 0),
                        longitude: parseFloat(dataEmpresa.longitude ?? 0),
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002
                    }} >
                    <Marker lat={dataEmpresa.latitude} lng={dataEmpresa.longitude} >
                        <img src={require("../../assets/marker.png")} width={30} height={"auto"} />
                    </Marker>
                </Mapa>
            </div>
        </>)
    }
    return (
        <>
            <BarraTop title={"empresa"} />
            <Container>
                {getEmpresa()}
                <h1 onClick={() => {
                    sessionStorage.setItem("empresa", JSON.stringify(state.empresa));
                    sessionStorage.setItem("carrito", JSON.stringify(carrito));
                    navigate("/carrito")
                }}>{`Carrito ${Object.values(carrito).length}`}</h1>

                <List >
                    <ProductosPorCategoria idEmpresa={id} carrito={carrito} setCarrito={setCarrito} />
                </List>
            </Container>

        </>
    )
}
