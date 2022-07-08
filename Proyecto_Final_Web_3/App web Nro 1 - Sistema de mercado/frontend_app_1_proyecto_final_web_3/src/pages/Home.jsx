import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';


const Home = (props) => {
    const [dataEmpresa, setDataEmpresa] = React.useState(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        getEmpresas();
        if (sessionStorage.getItem("carrito")) {
            if (window.confirm("Tiene pedidos seguro que desea eliminarlos?")) {
                sessionStorage.removeItem("carrito")
            } else {
                navigate("/carrito")
            }
        }
    }, [])

    const getEmpresas = () => {
        Model.Empresa.getAll().then((resp) => {
            setDataEmpresa(resp);
        }).catch((e) => {
            console.log(e)
        })
    }
    if (!Model.Usuario.getToken()) {
        return <Navigate to="login" />
    }

    const getLista = () => {
        if (!dataEmpresa) return <h1>Loading</h1>

        return dataEmpresa.map((obj) => {
            console.log(obj);
            return <>
                <div key={`empresa_item_${obj.id}`} style={{
                    border: "1px solid #eee",
                    borderRadius: 4,
                    padding: 4,
                    display: "flex",
                    maxWidth: 300,
                }} onClick={() => {
                    navigate("empresa/" + obj.id)
                }}>
                    <img src={obj["imagen_logo"]} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        objectFit: "cover"
                    }} />
                    <div style={{
                        flex: 1,
                        height: "100%",
                        paddingLeft: 8,
                    }}>
                        <span style={{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{obj.nombre}</span>
                        <br />
                        <span style={{ fontSize: 12 }}>{obj["latitude"] ?? "0"}</span>
                        <br />
                        <span style={{ fontSize: 12 }}>{obj["longitude"] ?? "0"}</span>
                    </div>
                </div>
                <div style={{ height: 8, width: 8 }}></div>
            </>
        })
    }

    return (
        <>
            <Drawer title="Home">
                <div style={{
                    display: "flex"
                }}>
                    {getLista()}
                </div>
            </Drawer>
        </>
    )
}
export default Home;
