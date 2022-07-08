import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Drawer from '../../../components/Drawer';
import FloatButtom from '../../../components/FloatButtom';
import FormData from '../../../components/FormData';
import TableData from '../../../components/TableData';
import Model from '../../../Model';


const Registro = (props) => {
    const navigate = useNavigate();
    const { id, id_empresa } = useParams();

    const [state, setState] = React.useState({});

    React.useEffect(() => {
        if (id_empresa) {
            Model.Empresa.getById(id_empresa).then((resp) => {
                state.empresa = resp;
                setState({ ...state })
            }).catch((e) => {
                console.log(e)
            })
            Model.Producto.getById(id).then((resp) => {
                state.producto = resp;
                setState({ ...state })
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [])

    if (id_empresa) {
        if (!state.empresa) return <div>Loading...</div>
    }
    if (id) {
        if (!state.producto) return <div>Loading...</div>
    }

    return (
        <Drawer title="admin/producto/registro">
            <FormData header={[
                { "name": "imagen_producto", type: "file", accept: "image/*" },
                { "name": "nombre", defaultValue: state?.producto?.nombre },
                { "name": "precio", defaultValue: state?.producto?.precio },
                { "name": "categoria_id", defaultValue: state?.producto?.categoria_id },
            ]} onSubmit={(obj, form) => {
                if (id) {
                    Model.Producto.editar(id, form).then((resp) => {
                        navigate("/admin/empresa/" + id_empresa)
                    }).catch((e) => {
                        console.error(e);
                    })
                } else {
                    form.append("empresa_id", id_empresa)

                    Model.Producto.registro(form).then((resp) => {
                        navigate("/admin/empresa/" + id_empresa)
                    }).catch((e) => {
                        console.error(e);
                    })
                }

            }} />
        </Drawer>
    )
}
export default Registro;
