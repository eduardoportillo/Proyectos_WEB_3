const express = require("express");
const router = express.Router();

//Controllers
const movieController = require("../controllers/MovieController");
const AuthController = require("../controllers/Authcontroller");

//Home
router.get("/", movieController.getAll)

//Auth
router.post("/login", AuthController.singIn)
router.post("/register", AuthController.singUp)


module.exports = router;