const express = require("express");
const router = express.Router();

// GET ALL BOOKMARKS, UPDATE ETC?

const userController = require("../controllers/userController");
//CREATE NEW USER
router.post("/register", userController.createUser);

//FIND ALL USERS
router.get("/findAllUsers", userController.findAllUsers);

//FIND USER
router.get("/findUser", userController.findUser);

// UPDATE USER
router.patch("/updateUser", userController.findUserAndUpdate);

//FIND USER AND DELETE
router.delete("/deleteUser", userController.deleteUser);

// LOGIN USER
router.get("/login", userController.loginUser);

// //VERIFY TOKEN
// router.post("/verify_token", userController.verify_token);

module.exports = router;
