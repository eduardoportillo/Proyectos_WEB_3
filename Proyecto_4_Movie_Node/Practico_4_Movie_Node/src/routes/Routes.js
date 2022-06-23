const express = require("express");
const router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');

//Controllers
const movieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");


//Auth
router.post("/api/token/", AuthController.singIn)
router.post("/entidades/signup/", AuthController.singUp)

//Movie
router.get("/entidades/movie/", auth, movieController.index)
router.get("/entidades/movie/:movieId", auth, movieController.show)
router.post("/entidades/movie/", auth, movieController.store)
router.put("/entidades/movie/:movieId", auth, movieController.update)
router.delete("/entidades/movie/:movieId", auth, movieController.delete)

module.exports = router;