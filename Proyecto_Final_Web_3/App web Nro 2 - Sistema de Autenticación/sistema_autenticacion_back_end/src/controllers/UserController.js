const User = require("../models/UserModel");

module.exports = {
    async find(req, res, next) {
        let userC = await User.findByPk(req.params.userId);

        if (!userC) {
            res.status(404).json({ msg: "El usuario no se encontro"});
        } else {
            req.userC = userC;
            next();
        }
    },
    async update(req, res) {
        
        let passwordEncrypt = bcrypt.hashSync(req.body.password, 10)

        req.userC.username = req.body.username;
        req.userC.password = passwordEncrypt;
        req.userC.email = req.body.email;

        req.userC.save().then(userC => {
            res.json(userC);
        })

    },
}