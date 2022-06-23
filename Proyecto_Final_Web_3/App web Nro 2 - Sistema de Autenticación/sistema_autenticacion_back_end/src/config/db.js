const Sequelize = require("sequelize");
const sequelize = new Sequelize("sistema_autenticacion_proyecto_final_back_end", "", "", {
  dialect: "sqlite",
  host: "./sistema_autenticacion_proyecto_final_back_end.db",
});

module.exports = sequelize;
