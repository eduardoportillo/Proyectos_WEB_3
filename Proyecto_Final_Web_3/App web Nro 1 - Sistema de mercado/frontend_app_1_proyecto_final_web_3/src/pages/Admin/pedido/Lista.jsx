import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import Drawer from '../../../components/Drawer';
import FloatButtom from '../../../components/FloatButtom';
import TableData from '../../../components/TableData';
import Model from '../../../Model';


const Lista = (props) => {
    const navigate = useNavigate();
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        Model.Pedido.getAll().then((resp) => {
            state.data = resp;
            setState({ ...state })
        }).catch((e) => {
            console.log(e)
        })

    }, [])

    const getTable = () => {
        if (!state.data) return
        return <TableData header={[
            "tracking_id", "monto_total", "usuario_id", "username"
        ]} data={state.data}
            onSelect={(itm) => {
                // navigate("/admin/empresa/" + itm.id)
            }}>

        </TableData>
    }

    return (
        <Drawer title="Pedidos">
            {getTable()}
        </Drawer>
    )
}
export default Lista;
