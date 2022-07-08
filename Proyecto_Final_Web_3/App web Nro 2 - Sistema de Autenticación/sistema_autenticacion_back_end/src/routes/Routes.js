const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const AuthController = require("../controllers/AuthController");
const UserController = require('../controllers/UserController');
const Policy = require('../policies/Policy');
const RoleController = require('../controllers/RoleController');

//Auth
router.post('/api/login/', AuthController.singIn);
router.post('/api/signup/', AuthController.singUp);

//User
router.get("/api/user/",auth, Policy.index, UserController.index)
router.put("/api/user/update/:userId/",auth, UserController.find, Policy.ValidatePermission, UserController.update)
router.get("/api/user/:userId/",auth, Policy.index, UserController.show)

//update User - Role
router.patch("/api/user/role/update/:userId/",auth, UserController.find, Policy.ValidatePermission, UserController.updateRole)

// Role 
router.get("/api/role/user/:idUser",auth, Policy.index, RoleController.userRole)
router.get("/api/role/",auth, Policy.index, RoleController.index)


module.exports = router;
