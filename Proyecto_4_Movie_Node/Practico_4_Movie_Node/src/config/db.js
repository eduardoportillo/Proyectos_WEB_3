const Sequelize = require("sequelize");
const sequelize = new Sequelize("proyecto_4_movie_node_db", "", "", {
  dialect: "sqlite",
  host: "./proyecto_4_movie_node_db.sqlite",
});

module.exports = sequelize;
