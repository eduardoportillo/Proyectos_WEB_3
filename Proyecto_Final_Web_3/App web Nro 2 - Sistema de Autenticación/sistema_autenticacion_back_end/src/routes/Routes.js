const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const AuthController = require("../controllers/AuthController");
const UserController = require('../controllers/UserController');
const Policy = require('../policies/Policy');

//Auth
router.post('/api/singin/', AuthController.singIn);
router.post('/api/signup/', AuthController.singUp);

//User
router.get("/api/user/", UserController.index)
// router.get("/api/user/",auth, Policy.show, UserController.index)
router.patch("/api/user/:userId",auth, UserController.find, Policy.update, UserController.update)

//update role - user
// router.put("/api/user/:userId",auth, UserController.find, Policy.update, UserController.update)


module.exports = router;
