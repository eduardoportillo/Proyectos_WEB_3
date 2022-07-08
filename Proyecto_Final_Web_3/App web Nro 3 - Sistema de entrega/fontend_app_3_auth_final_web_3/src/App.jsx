import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Pedido from './pages/Pedido';
import Signup from './pages/Signup';
import Registro from './pages/Registro';
import Aceptar from './pages/Aceptar';
import Terminar from './pages/Terminar';
import Buscar from './pages/Buscar';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/pedido/:id' element={<Pedido />} />
                <Route path='/pedido/registro/:id' element={<Registro />} />
                <Route path='/pedido/aceptar/:id' element={<Aceptar />} />
                <Route path='/pedido/terminar/:id' element={<Terminar />} />
                <Route path='/buscar' element={<Buscar />} />
            </Routes>
        </Router>
    );
}
