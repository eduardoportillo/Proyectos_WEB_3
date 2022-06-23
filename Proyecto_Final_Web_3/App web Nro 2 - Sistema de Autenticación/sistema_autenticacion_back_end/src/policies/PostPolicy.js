const User = require("../models/UserModel")

module.exports = {

    show(req, res, next){
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(403).json({msg: "No estas autorizado para correr la ruta show"})
        }
    },

    update(req, res, next){
        if(req.user.id === req.user.userId || User.isAdmin(req.user.roles)){
        }else{
            res.status(403).json({msg: "No estas autorizado para correr la ruta update"})
        }
    }
}