import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Lista from './Lista';


export default [
    <Route path='/admin/pedido' element={<Lista />} />,
]
