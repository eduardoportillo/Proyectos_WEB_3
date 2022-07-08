import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Drawer from '../components/Drawer';
import FormData from '../components/FormData';
import Model from '../Model';
import Direccion from './Direccion';


const Registro = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [state, setState] = React.useState({});

    React.useEffect(() => {

    }, [])


    return (
        <Drawer title="admin/producto/registro">
            <Direccion onRegionChangeComplete={(dir) => {
                state.region = dir;
            }} />
            <FormData header={[
                { "name": "nombre_ubicacion", required: true },
            ]} onSubmit={(obj) => {
                if (!state.region?.latitude && !state.region?.longitude) {
                    alert("Deve seleccionar la ubicacion")
                    return;
                }
                obj.latitude = state.region?.latitude
                obj.longitude = state.region?.longitude
                Model.Entrega.encamino(id, obj).then((resp) => {
                    window.history.back()
                }).catch((e) => {
                    console.error(e);
                })

            }} />
        </Drawer>
    )
}
export default Registro;
