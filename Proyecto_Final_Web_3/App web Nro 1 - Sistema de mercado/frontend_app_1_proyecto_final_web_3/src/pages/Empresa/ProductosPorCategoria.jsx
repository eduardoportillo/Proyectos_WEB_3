import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions, List } from '@material-ui/core';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Model from '../../Model';
const Env = require('../../env.json');

export default function ProductosPorCategoria(props) {
    const { idEmpresa } = props;
    const navigate = useNavigate();
    const [state, setState] = React.useState({});


    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            width: 200,
            margin: 8
        },
        media: {
            height: 140,
        },
    });
    const classes = useStyles();

    React.useEffect(() => {
        Model.Categoria.getAll()
            .then(resp => {
                state.categorias = resp;
                setState({ ...state });
            })
            .catch(e => {
                alert(JSON.stringify(e));
            });
        Model.Producto.getByEmpresa(idEmpresa)
            .then(resp => {
                state.productos = resp;
                setState({ ...state });
            })
            .catch(e => {
                alert(JSON.stringify(e));
            });
    }, []);

    if (!state.categorias) return <label>loading...</label>;
    if (!state.productos) return <label>loading...</label>;
    console.log(state);

    const getProductosEnCategoria = (productos_en_categoria, categoria) => {
        return productos_en_categoria.map(producto => {
            var inCar = props.carrito[producto.id];
            let imagen_producto = Env.url_mercado + producto.imagen_producto;
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={imagen_producto}
                            title='Contemplative Reptile'
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                            >
                                {producto.nombre}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                {producto.precio}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size='small' color='primary'>
                            <label
                                onClick={() => {
                                    if (!inCar) {
                                        producto.cantidad = 1;
                                        props.carrito[producto.id] = producto;
                                    } else {
                                        delete props.carrito[producto.id]
                                    }
                                    props.setCarrito({ ...props.carrito });
                                }}
                            >
                                {!inCar ? 'add to car' : 'Remove from car'}
                            </label>
                        </Button>
                    </CardActions>
                </Card>
            );
        });
    };
    const categorias = state.categorias;
    return categorias.map(categoria => {
        const productos_en_categoria = state.productos.filter(
            pro => pro.categoria_id == categoria.id
        );
        if (!productos_en_categoria.length) return null;
        return (
            <div>
                <h2>{categoria.nombre}</h2>
                <List style={{
                    display: 'flex',

                }}>
                    {getProductosEnCategoria(productos_en_categoria, categoria)}

                </List>
            </div>
        );
    });
}
