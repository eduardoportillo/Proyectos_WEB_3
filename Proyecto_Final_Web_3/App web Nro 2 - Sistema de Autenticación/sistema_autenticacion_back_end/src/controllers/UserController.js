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

    async show(req, res) {
        let userC = await User.findByPk(req.params.userId);
        return res.status(200).json(userC);
    },

    async update(req, res) {
        if (req.body.password === undefined) {
            return res.json({msg: 'la contraseñá no puede faltar'});
        } else {
            let passwordEncrypt = bcrypt.hashSync(req.body.password, 10);
            req.userC.password = passwordEncrypt;
        }

        if (req.body.username === null) {
            return res.json({msg: 'El username no puede faltar'});
        } else {
            req.userC.username = req.body.username;
        }

        if (req.body.email === null) {
            return res.json({msg: 'El correo no puede faltar'});
        } else {
            req.userC.email = req.body.email;
        }

        await req.userC.update().then(userC => {
            res.json(userC);
        });
    },
    async delete(req, res) {
        if (!req.params.userId) {
            res.status(400).send({
                message: 'El id de la persona es requerido',
            });
            return;
        }
        const user = await User.findByPk(req.params.userId);
        if (user == null) {
            res.status(404).send({message: 'Persona no encontrada'});
            return;
        }
        await user.destroy();
        res.send({
            msg: `user: id:${user.id} name:${user.name} fue eliminado`,
        });
    },

    async updateRole(req, res, next) {
        let role = await Role.findByPk(req.body.roleId);
        let user = await User.findByPk(req.params.userId);

        if (role) {
            await user.setRoles(role);
            return res.status(200).json({msg: 'update succes!'});
        } else {
            return res.status(500).json({msg: 'rol no pillado.'});
        }
    },
};
