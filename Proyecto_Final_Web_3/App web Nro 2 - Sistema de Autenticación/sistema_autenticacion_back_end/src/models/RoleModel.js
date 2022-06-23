const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

class Role extends Model {}

Role.init(
	{
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize,
		modelName: 'role',
		timestamps: false,
	}
);

// Role.associate = function(models) {
// 	Role.belongsToMany(User, {through: 'user_role'});
// };
module.exports = Role;
