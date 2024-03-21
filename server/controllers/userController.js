const User = require("../schemas/UserSchema");
const argon2 = require("argon2");
require("dotenv").config();

//VERIFY AND PROVIDE TOKEN
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

class UserController {
  //POST: CREATE USER OR ADMIN
  async createUser(req, res) {
    let { firstName, lastName, email, password, isAdmin, bookmarks } = req.body;

    const findUser = await User.findOne({ email });

    try {
      if (findUser) {
        return res.send({
          ok: false,
          message: "E-mail already registered in the database",
        });
      }

      const hashedPassword = await argon2.hash(password);

      let userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin,
        bookmarks,
      };

      const user = await User.create(userData);
      console.log("Users retrieved successfully");
      return res.send({ ok: true, data: user });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res
        .status(500)
        .send({ ok: false, error: "Error retrieving users" });
    }
  }

  // GET: ALL USERS
  async findAllUsers(req, res) {
    try {
      const users = await User.find({});
      console.log("Users retrieved successfully");
      return res.send({ ok: true, data: users });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res
        .status(500)
        .send({ ok: false, error: "Error retrieving users" });
    }
  }

  // GET: SINGLE USER OR ADMIN
  async findUser(req, res) {
    try {
      let email = req.body.email;
      const userFound = await User.findOne({ email });
      console.log(["from controller", req.body]);
      if (!userFound) {
        return res.status(404).send({
          ok: false,
          message: "User not found. ",
        });
      }

      return res.send({
        ok: true,
        data: userFound,
      });
    } catch (error) {
      res.status(500).send({ ok: false, error: "Error retrieving user" });
    }
  }

  // PATCH: FIND USER OR ADMIN AND UPDATE
  async findUserAndUpdate(req, res) {
    try {
      //GET HOLD OF ID AND BOOKMARK SENT FROM CLIENT
      let { _id, selectedBookmark } = req.body;

      // let update;

      // GET HOLD OF USER IN DB
      let user = await User.findById(_id);

      // CHECK IF BOOKMARK IS ALREADY STORED IN BOOKMARKS ARR
      let isBookmarked = user.bookmarks.some(
        (bookmark) => bookmark.url === selectedBookmark.url
      );
      let updatedUser;
      console.log(isBookmarked);

      // IF NOT IN DB, PUSH IT TO EXISTING BOOKMARKS
      if (!isBookmarked) {
        updatedUser = await User.findOneAndUpdate(
          { _id },
          { $push: { bookmarks: selectedBookmark } },
          { new: true }
        );
      }

      if (isBookmarked) {
        console.log("else clause ");

        let update = user.bookmarks.filter(
          (bookmark) => bookmark.url !== selectedBookmark.url
        );

        console.log("update bellow ");
        console.log(update);

        updatedUser = await User.findOneAndUpdate(
          { _id },
          { bookmarks: update },
          { new: true }
        );
      }

      return res.send({ ok: true, data: user });
    } catch (error) {
      console.log("couldn't find user ???");
      res.status(500).send({ ok: false, error });
    }
  }

  // DELETE: DELETE USER OR ADMIN
  async deleteUser(req, res) {
    try {
      let _id = req.body._id;

      let foundUser = await User.findOneAndDelete({ _id });

      if (!foundUser) {
        console.log("User not found or already deleted");
        return res.send({
          ok: false,
          message: "User not found or already deleted",
        });
      }

      return res.send({ ok: true, data: foundUser });
    } catch (error) {
      return res.status(500).send({ ok: false, error });
    }
  }

  //POST: LOGIN USER OR ADMIN
  async loginUser(req, res) {
    console.log(req.body);
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({ email });
      if (!userFound) {
        return res
          .status(401)
          .json({ ok: false, message: "Wrong e-mail or password" });
      }

      const match = await argon2.verify(userFound.password, password);

      if (!match) {
        return res
          .status(401)
          .json({ ok: false, message: "Wrong e-mail or password" });
      }

      // const token = jwt.sign({ email }, jwt_secret, {
      //   expiresIn: "90d",
      // });

      const token = jwt.sign({ user: userFound }, jwt_secret, {
        expiresIn: "90d",
      });

      return res.status(200).json({
        ok: true,
        message: "You are logged in",
        token,
        user: userFound,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ ok: false, error: "Internal Server Error" });
    }
  }

  //TOKEN VERIFYER
  verifyToken = (req, res) => {
    const token = req.headers.authorization;
    // const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ ok: false, message: "Token is missing" });
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res
          .status(401)
          .json({ ok: false, message: "Token is corrupted" });
      } else {
        const user = decoded.user;
        console.log(user);
        return res.json({ ok: true, user });
      }
    });
  };
}

module.exports = new UserController();
