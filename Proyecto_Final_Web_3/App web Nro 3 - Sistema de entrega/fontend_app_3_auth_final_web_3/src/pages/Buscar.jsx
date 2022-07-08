import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';
import FormData from '../components/FormData';

import TableData from '../components/TableData';


const Buscar = (props) => {
    const [state, setState] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {

    }, [])


    return (
        <>
            <Drawer title="Buscar">
                <FormData header={[
                    { "name": "tracking_id", required: true },
                ]} onSubmit={(obj) => {
                    Model.Entrega.getByIdPedido(obj.tracking_id).then((resp) => {
                        navigate("/pedido/"+obj.tracking_id)
                    }).catch((e) => {
                        console.error(e);
                    })

                }} />
            </Drawer>
        </>
    )
}
export default Buscar;
