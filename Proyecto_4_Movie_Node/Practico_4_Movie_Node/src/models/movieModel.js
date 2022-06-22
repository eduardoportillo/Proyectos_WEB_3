const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

class Movie extends Model {}

Movie.init(
	{
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        image: {
            type: DataTypes.STRING,
        },
	},
	{
		sequelize,
		modelName: 'movie',
		timestamps: false,
	}
);

module.exports = Movie;
