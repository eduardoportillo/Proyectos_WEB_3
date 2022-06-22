const express = require("express");
const logger = require('morgan');
const sequelize = require("./config/db");
const movieRoutes = require("./routes/movie.routes");
const app = express();

app.use(logger('dev'));

sequelize.sync().then(() => console.log("database connected successfully"));

app.use(express.json());

app.use("/api/movie",movieRoutes)

app.listen(3000, () => {
    console.log("Server started on port 3000");
  });