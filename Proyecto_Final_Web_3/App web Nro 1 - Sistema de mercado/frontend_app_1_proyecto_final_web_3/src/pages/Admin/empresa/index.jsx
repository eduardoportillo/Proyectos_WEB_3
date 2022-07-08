import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Lista from './Lista';
import Registro from './Registro';
import Perfil from './Perfil';


export default [
    <Route path='/admin/empresa' element={<Lista />} />,
    <Route path='/admin/empresa/registro' element={<Registro />} />,
    <Route path='/admin/empresa/registro/:id' element={<Registro />} />,
    <Route path='/admin/empresa/:id' element={<Perfil />} />
]
