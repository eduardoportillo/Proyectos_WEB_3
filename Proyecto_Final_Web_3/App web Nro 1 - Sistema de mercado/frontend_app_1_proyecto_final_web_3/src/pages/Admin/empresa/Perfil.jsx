import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Drawer from '../../../components/Drawer';
import FloatButtom from '../../../components/FloatButtom';
import TableData from '../../../components/TableData';
import Model from '../../../Model';
const Env = require('../../../env.json');


const Perfil = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        Model.Empresa.getById(id).then((resp) => {
            state.empresa = resp;
            setState({ ...state })
        }).catch((e) => {
            console.log(e)
        })
        Model.Categoria.getAll()
            .then(resp => {
                state.categorias = resp;
                setState({ ...state });
            })
            .catch(e => {
                // alert(JSON.stringify(e));
            });
        Model.Producto.getByEmpresa(id)
            .then(resp => {
                state.productos = resp;
                setState({ ...state });
            })
            .catch(e => {
                // alert(JSON.stringify(e));
            });
    }, [])


    const getEmpresa = () => {
        const dataEmpresa = state.empresa;
        if (!dataEmpresa) return <label>Loading...</label>
        return <div>
            <h2>{dataEmpresa.nombre}</h2>
        </div>
    }
    const getProductos = () => {
        const data = state.productos;
        const categorias = state.categorias;
        if (!data) return <label>Loading...</label>
        if (!categorias) return <label>Loading...</label>
        var dataFinal = data.map(obj => {
            var categoria = categorias.find(o => o.id == obj.categoria_id);
            return {
                ...obj,
                categoria: categoria.nombre,
                img: <img src={Env.url_mercado +obj.imagen_producto} width={50} height={50} alt={"sad"} />

            }
        })
        return <TableData
            header={["img", "nombre", "precio", "categoria"]}
            data={dataFinal}
            onSelect={(itm) => {
                navigate("/admin/producto/registro/" + id + "/" + itm.id)

            }}
        />
    }

    return (
        <Drawer title="Perfil">
            <buttom type="button" onClick={() => {
                navigate("/admin/empresa/registro/" + id)
            }}> Editar </buttom>
            <buttom type="button" onClick={() => {
                Model.Empresa.delete(id);
                navigate("/admin/empresa");
            }}> Eliminar </buttom>

            {getEmpresa()}
            <hr />
            <h3>Productos</h3>
            <FloatButtom onClick={() => {
                navigate("/admin/producto/registro/" + id)
            }} />

            {getProductos()}
        </Drawer>
    )
}
export default Perfil;
