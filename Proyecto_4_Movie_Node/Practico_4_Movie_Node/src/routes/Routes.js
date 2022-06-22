const express = require("express");
const router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');

//Controllers
const movieController = require("../controllers/MovieController");
const AuthController = require("../controllers/Authcontroller");


//Auth
router.post("/api/token/", AuthController.singIn)
router.post("/entidades/signup/", AuthController.singUp)

//Movie
router.get("/entidades/movie/", auth, movieController.getAll)

module.exports = router;