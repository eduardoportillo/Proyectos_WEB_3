const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

class Gender extends Model {}

Gender.init(
	{
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                isAlpha:{msg: "El nombre solo puede contener letras"},
                len: {args: [2,255], msg: "El nombre tiene que ser minimo de 2 chars"}
            }
        }
	},
	{
		sequelize,
		modelName: 'gender',
		timestamps: false,
	}
);

module.exports = Gender;
