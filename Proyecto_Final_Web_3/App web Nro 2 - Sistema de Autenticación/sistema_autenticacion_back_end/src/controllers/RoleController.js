const Role = require("../models/RoleModel");
const User = require("../models/UserModel");

module.exports = {
    async index(req, res) {
		const role = await Role.findAll();
		return res.status(200).json(role);
	},
	
	async userRole(req, res) {
		let user = await User.findByPk(req.params.idUser, { 
			include: Role
		});
		// const roleUser = await user.getRoles();
		return res.status(200).json(user);
	},
}