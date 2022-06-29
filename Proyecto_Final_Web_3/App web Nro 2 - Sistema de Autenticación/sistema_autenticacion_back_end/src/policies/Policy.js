const User = require("../models/UserModel")

module.exports = {

    index(req, res, next){
        if(User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: "No estas autorizado para correr User Index"})
        }
    },

    show(req, res, next){
        if(req.user.id === req.user.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: "No estas autorizado para correr User Show"})
        }
    },

    update(req, res, next){
        if(req.user.id === req.user.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: "No estas autorizado para correr User Update"})
        }
    }
}