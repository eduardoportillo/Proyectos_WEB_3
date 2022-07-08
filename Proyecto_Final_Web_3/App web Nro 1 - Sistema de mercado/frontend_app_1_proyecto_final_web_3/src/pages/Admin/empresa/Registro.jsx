import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Drawer from '../../../components/Drawer';
import FloatButtom from '../../../components/FloatButtom';
import FormData from '../../../components/FormData';
import TableData from '../../../components/TableData';
import Model from '../../../Model';
import Direccion from './Direccion';


const Registro = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [state, setState] = React.useState({});

    React.useEffect(() => {
        if (id) {
            Model.Empresa.getById(id).then((resp) => {
                state.empresa = resp;
                setState({ ...state })
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [])

    if (id) {
        if (!state.empresa) return <div>Loading...</div>
    }

    return (
        <Drawer title="admin/empresa/registro">
            <FormData header={[
                { "name": "imagen_logo", type: "file", accept: "image/*" },
                { "name": "nombre", defaultValue: state?.empresa?.nombre },
            ]} onSubmit={(obj, form) => {
                // obj = {
                //     ...obj,
                //     ...state.direccion
                // }
                form.append("latitude", state.direccion?.latitude)
                form.append("longitude", state.direccion?.longitude)
                if (id) {
                    Model.Empresa.editar(id, form).then((resp) => {
                        navigate("/admin/empresa/" + id)
                    }).catch((e) => {
                        console.error(e);
                    })
                } else {
                    Model.Empresa.registro(obj).then((resp) => {
                        navigate("/admin/empresa/")
                    }).catch((e) => {
                        console.error(e);
                    })
                }

            }} />
            <Direccion latLng={state?.empresa} onChange={(resp) => {
                state.direccion = resp;
            }} />

        </Drawer>
    )
}
export default Registro;
