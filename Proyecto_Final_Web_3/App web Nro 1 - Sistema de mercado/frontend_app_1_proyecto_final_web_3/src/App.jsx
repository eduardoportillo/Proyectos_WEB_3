import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Admin from './pages/Admin';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Empresa from './pages/Empresa';
import Carrito from './pages/Carrito';

import Direccion from './pages/Direccion';
import Pedido from './pages/Pedido';
import History from './pages/History';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/empresa/:id' element={<Empresa />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/direccion' element={<Direccion />} />
                <Route path='/pedido' element={<Pedido />} />
                <Route path='/history' element={<History />} />
                {Admin}
            </Routes>
        </Router>
    );
}
