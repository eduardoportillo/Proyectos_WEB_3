const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VarEnv = require('../config/VarEnv');
const Role = require('../models/RoleModel');

module.exports = {
    //Login
    singIn(req, res) {
        let {email, password} = req.body;

        User.findOne({
            where: {
                email: email,
            },
            include: {
                model: Role,
            },
        })
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        msg: 'Usuario con este correo no encontrado',
                    });
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // let rolesArray = Array.from(user.roles)
                        let roleUser = user.roles[0]?.dataValues.role;
                        if(roleUser){
                            let token = jwt.sign(
                                {
                                    userId: user.id,
                                    username: user.username,
                                    email: user.email,
                                    roles: roleUser,
                                },
                                VarEnv.auth.salt,
                                {
                                    expiresIn: VarEnv.auth.expiresIn,
                                }
                            );
                            res.json({
                                // user: user,
                                token: token,
                            });
                        }else{
                            res.status(500).json({
                                msg: 'Rol no asignado, Todo usuario debe tener un rol',
                            });
                        }
                        
                    } else {
                        res.status(401).json({
                            msg: 'contraseña incorrecta',
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg: err});
            });
    },

    async singUp(req, res) {
        let passwordEncrypt = bcrypt.hashSync(req.body.password, 10);
        let useraux;

        await User.create({
            username: req.body.username,
            password: passwordEncrypt,
            email: req.body.email,
        })
            .then(user => {
                let token = jwt.sign({user: user}, VarEnv.auth.salt, {
                    expiresIn: VarEnv.auth.expiresIn,
                });

                useraux = user;
                res.json({
                    user: user,
                    token: token,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({msg: err.errors});
            });

        // Asignando Rol "usuariocomun" por default
        if(useraux){
            await Role.findOne({where: {role: 'usuariocomun'}}).then(role => {
                useraux.addRole(role);
            }).catch(err => {
                res.status(500).json({msg: err.errors});
            });
        }
        
    },
};
