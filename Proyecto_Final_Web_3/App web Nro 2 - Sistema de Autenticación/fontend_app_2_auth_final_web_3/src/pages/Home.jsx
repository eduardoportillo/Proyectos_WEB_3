import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import BarraTop from '../components/BarraTop';
import Drawer from '../components/Drawer';
import Model from '../Model';
import TableData from '../components/TableData';


const Home = (props) => {
    const [dataUsuario, setDataUsuario] = React.useState(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        getUsuario();
    }, [])

    const getUsuario = () => {
        Model.Usuario.getAll().then((resp) => {
            setDataUsuario(resp);
        }).catch((e) => {
            console.log(e)
        })
    }

    const getLista = () => {
        if (!dataUsuario) return <div>Loading</div>

        return <TableData header={[
            "username",
            "email",
        ]} data={dataUsuario}
            onSelect={(itm) => {
                navigate("/signup/" + itm.id)
            }}>

        </TableData>
    }
    if (!Model.Usuario.getToken()) {
        return <Navigate to="login" />
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
