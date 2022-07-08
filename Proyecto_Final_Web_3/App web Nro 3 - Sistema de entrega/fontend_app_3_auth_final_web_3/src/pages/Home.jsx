import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';
import TableData from '../components/TableData';


const Home = (props) => {
    const [state, setState] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        Model.Pedido.getAll().then((resp) => {
            if (!Model.Usuario.isRol(["superadmin", "entregaadmin"])) {
                var user = Model.Usuario.getUser();
                resp = resp.filter((o) => o.usuario_id == user.userId)
            }
            state.pedidos = resp;
            setState({ ...state })
        })
        Model.Entrega.getAll().then((resp) => {
            state.entregas = resp;
            setState({ ...state })
        });
    }, [])


    const getLista = () => {
        if (!state.pedidos) return <h1>Loading</h1>
        if (!state.entregas) return <h1>Loading</h1>

        var arrOrder = state.pedidos.map((obj) => {
            var entrega = state.entregas.find(o => o.pedido_id == obj.tracking_id)
            return {
                ...obj,
                entrega_estado: entrega.estado
            }
        })
        arrOrder = arrOrder.sort((a, b) => a.entrega_estado - b.entrega_estado)
        return <TableData header={[
            "tracking_id", "monto_total", "username", "entrega_estado",
        ]} data={arrOrder}
            onSelect={(itm) => {
                navigate("pedido/" + itm.tracking_id)
            }}>

        </TableData>
    }
    if (!Model.Usuario.getToken()) {
        return <Navigate to="/buscar" />
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
