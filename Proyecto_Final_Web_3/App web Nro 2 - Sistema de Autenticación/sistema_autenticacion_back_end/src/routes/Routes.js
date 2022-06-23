const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const AuthController = require("../controllers/AuthController");
const UserController = require('../controllers/UserController');
const PostPolicy = require('../policies/PostPolicy');

//Auth
router.post('/api/singin/', AuthController.singIn);
router.post('/api/signup/', AuthController.singUp);

//User
router.patch("/api/user/:userId",auth, UserController.find, PostPolicy.update, UserController.update)
module.exports = router;
