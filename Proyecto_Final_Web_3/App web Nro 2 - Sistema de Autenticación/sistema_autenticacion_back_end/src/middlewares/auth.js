const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({msg: 'Acceso no autorizado'});
    } else {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, 'salt', (err, decoded) => {
            if (err) {
                res.status(500).json({msg: 'Ha ocurrido un problema al decodificar el token',err});
            } else {
                User.findByPk(decoded.user.id, {include: 'roles'}).then(
                    user => {
                        req.user = user;
                        next();
                    }
                );
            }
        });
    }
};
