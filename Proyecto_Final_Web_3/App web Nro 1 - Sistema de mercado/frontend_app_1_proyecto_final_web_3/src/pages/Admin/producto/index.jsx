import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Lista from './Lista';
import Registro from './Registro';


export default [
    <Route path='/admin/producto' element={<Lista />} />,
    <Route path='/admin/producto/registro/:id_empresa' element={<Registro />} />,
    <Route path='/admin/producto/registro/:id_empresa/:id' element={<Registro />} />,
]
