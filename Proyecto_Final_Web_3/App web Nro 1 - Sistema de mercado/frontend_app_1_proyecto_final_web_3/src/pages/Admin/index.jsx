import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import empresa from './empresa/index';
import producto from './producto';
import pedido from "./pedido"
export default [
    ...empresa,
    ...producto,
    ...pedido
]
