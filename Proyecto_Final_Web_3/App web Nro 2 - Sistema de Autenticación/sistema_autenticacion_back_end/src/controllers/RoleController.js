const Role = require("../models/RoleModel");

module.exports = {
    async index(req, res) {
		const role = await Role.findAll();
		return res.status(200).json(role);
	},
}