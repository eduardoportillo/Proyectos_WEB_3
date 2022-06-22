const express = require("express");
const logger = require('morgan');
const sequelize = require("./config/db");
const movieRoutes = require("./routes/Routes");
const app = express();


//db
sequelize.sync().then(() => console.log("database connected successfully"));

//server config
app.use(express.json());
app.use(logger('dev'));

//routes
app.use(require('./routes/Routes'));

//Http Server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000/");
  });