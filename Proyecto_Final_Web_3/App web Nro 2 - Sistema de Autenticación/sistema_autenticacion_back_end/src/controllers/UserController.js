const User = require("../models/UserModel");

module.exports = {
    async find(req, res, next) {
        let user = await User.findByPk(req.params.userId);

        if (!user) {
            res.status(404).json({ msg: "El user no se encontrado" });
        } else {
            req.user = user;
            next();
        }
    },
    async update(req, res) {

        req.user.username = req.body.username;
        req.user.password = req.body.password;
        req.user.email = req.body.email;

        req.user.save().then(user => {
            res.json(user);
        })

    },
}