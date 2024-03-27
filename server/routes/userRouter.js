const express = require("express");
const router = express.Router();

// GET ALL BOOKMARKS, UPDATE ETC?

const userController = require("../controllers/userController");

//CREATE NEW USER
router.post("/register", userController.createUser);

//FIND ALL USERS
router.get("/all", userController.findAllUsers);

//FIND A SINGLE USER
router.post("/user", userController.findUser);

// UPDATE USER AND BOOKMARKS
router.patch("/update", userController.findUserAndUpdate);

//FIND USER AND DELETE
router.delete("/delete", userController.deleteUser);

// LOGIN USER
router.post("/login", userController.loginUser);

// //VERIFY TOKEN
router.post("/verifyToken", userController.verifyToken);

module.exports = router;
