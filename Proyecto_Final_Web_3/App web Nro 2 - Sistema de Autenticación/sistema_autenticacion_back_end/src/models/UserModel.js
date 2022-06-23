const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./RoleModel');

class User extends Model {}

User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				len: {
					args: [2, 255],
					msg: 'El nombre tiene que ser minimo de 2 chars',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isEmail: {msg: 'El email tiene que ser un correo valido'},
			},
		},
	},
	{
		sequelize,
		modelName: 'user',
		timestamps: false,
	}
);

// User.associate = function(models) {
// 	User.belongsToMany(Role, {through: 'user_role'});
// };

User.belongsToMany(Role,  {
    through: 'user_role',
    foreignKey: Role.id,
    onUpdate: 'CASCADE', // optional
    onDelete: 'CASCADE',
  });
  
Role.belongsToMany(User,  {
    through: 'user_role',
    foreignKey: User.id,
    onUpdate: 'CASCADE', // optional
    onDelete: 'CASCADE',
  });

User.isAdmin = roles => {
	let tmpArray = [];
	roles.forEach(role => {
		tmpArray.push(role.role);
	});

	return tmpArray.includes('superadmin');
};

module.exports = User;
