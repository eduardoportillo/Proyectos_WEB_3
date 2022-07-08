import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';
import TableData from '../components/TableData';


const Rol = (props) => {
    const [state, setState] = React.useState({});

    const navigate = useNavigate();

    React.useEffect(() => {
        Model.Rol.getAll().then((resp) => {
            state.roles = resp;
            setState({ ...state })
        }).catch((e) => {
            console.log(e)
        })
        Model.Rol.getByUser(props.id_usr).then((resp) => {
            state.rol_usr = resp.roles[0];
            setState({ ...state })
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    const getLista = () => {
        if (!state.roles) return <div>Loading</div>

        return <select onChange={(e) => {
            var id = e.target.value;
            Model.Usuario.editarRol(props.id_usr, { roleId: id }).then((e) => {

            })
        }} >
            {state.roles.map((itm) => {
                return <option value={itm.id} selected={state.rol_usr?.id == itm.id}>{itm.role}</option>
            })}
        </select>

    }

    return (
        <>
            <div style={{
                display: "flex"
            }}>
                {getLista()}
            </div>
        </>
    )
}
export default Rol;
