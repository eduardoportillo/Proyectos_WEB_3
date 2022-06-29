module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('persona', {
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING
        },
        edad: {
            type: Sequelize.INTEGER
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        ciudad: {
            type: Sequelize.STRING
        },
    }, {
    });
    return Persona;
}