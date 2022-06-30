const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VarEnv = require('../config/VarEnv');

module.exports = {
    async find(req, res, next) {
        let token = req.headers.authorization.split(' ')[1];
        let jwtDecode = jwt.verify(token, VarEnv.auth.salt);

        let userC = await User.findByPk(jwtDecode.userId);

        if (!userC) {
            res.status(404).json({msg: 'El usuario no se encontro'});
        } else {
            req.userC = userC;
            next();
        }
    },

    async index(req, res) {
        const user = await User.findAll();
        return res.status(200).json(user);
    },

    async update(req, res) {
        let passwordEncrypt = bcrypt.hashSync(req.body.password, 10);

        req.userC.username = req.body.username;
        req.userC.password = passwordEncrypt;
        req.userC.email = req.body.email;

        await req.userC.save().then(userC => {
            res.json(userC);
        });
    },

    async updateRole(req, res, next) {
        let role = await Role.findByPk(req.body.roleId);
        if (role) {
            await req.userC.setRoles(role);
            return res.status(200).json({msg: 'update succes!'});
        } else {
            return res.status(500).json({msg: 'rol no pillado.'});
        }
    },
};
