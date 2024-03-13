const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//FIND ALL USERS
router.get("/findAllUsers", userController.findAllUsers);

// GET ALL BOOKMARKS, UPDATE ETC?

// //CREATE NEW USER
// router.post("/register", userController.createUser);

// //FIND USER
// router.get("/findUser", userController.findOne);

// //UPDATE USER
// router.delete("/updateUser", userController.findOneAndUpdate);

// //FIND USER AND DELETE
// router.delete("/deleteUser", userController.findOneAndDelete);

// // LOGIN USER
// router.post("/login", userController.loginUser);

// //VERIFY TOKEN
// router.post("/verify_token", userController.verify_token);

module.exports = router;
