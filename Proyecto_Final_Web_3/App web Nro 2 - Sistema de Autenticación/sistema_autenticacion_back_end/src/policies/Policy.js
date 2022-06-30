const User = require("../models/UserModel")

module.exports = {

    index(req, res, next){
        if(User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: "No estas autorizado para correr User Index"})
        }
    },

    ValidatePermission(req, res, next){
        if(req.user.id === +req.params.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: `${req.user.email} No estas autorizado para correr esta Ruta`})
        }
    },
}