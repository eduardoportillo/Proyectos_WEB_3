import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Drawer from '../components/Drawer';
import FormData from '../components/FormData';
import Model from '../Model';


const Aceptar = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = React.useState({});
    React.useEffect(() => {

    }, [])
    return (
        <Drawer title="admin/producto/registro">
            <FormData header={[
                { "name": "nombre_ubicacion", defaultValue: state?.producto?.nombre_ubicacion, required: true },
                // { "name": "precio", defaultValue: state?.producto?.precio },
                // { "name": "categoria_id", defaultValue: state?.producto?.categoria_id },
            ]} onSubmit={(obj) => {
                Model.Entrega.pedidoPendiente(id, obj).then((resp) => {
                    window.history.back()
                }).catch((e) => {
                    console.error(e);
                })
            }} />
        </Drawer>
    )
}
export default Aceptar;
