import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../../components/BarraTop';
import Model from '../../Model';
import Detalle from './Detalle';


const History = (props) => {
    const [dataEmpresa, setDataEmpresa] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        getEmpresas();
    }, [])

    const getEmpresas = () => {
        Model.Pedido.getByIdUsuario(Model.Usuario.getUser().userId).then((resp) => {
            setDataEmpresa(resp);
        }).catch((e) => {
            console.log(e)
        })
    }
    // if (!Model.Usuario.getToken()) {
    //     return <Navigate to="login" />
    // }

    const getLista = () => {
        if (!dataEmpresa) return <h1>Loading</h1>
        console.log(dataEmpresa);
        return <Detalle data={dataEmpresa} />
    }
    return (
        <>
            <BarraTop title={"hitory"} />
            <br />
            {/* <h1 onClick={() => {
                Model.Usuario.signout();
            }}>salir</h1> */}
            <div style={{
                display: "flex"
            }}>
                {getLista()}
            </div>
        </>
    )
}
export default History;
