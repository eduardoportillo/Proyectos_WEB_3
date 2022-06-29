module.exports = app => {
    const pruebacontroller = require('../controllers/prueba.controller');
    let router = require('express').Router();

    router.get('/holamundo', pruebacontroller.prueba);

    app.use('/api/prueba', router);
}