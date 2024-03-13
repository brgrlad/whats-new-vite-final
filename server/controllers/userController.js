const User = require("../schemas/UserSchema");

class UserController {
  //POST: CREATE USER OR ADMIN
  async createUser(req, res) {
    let { firstName, lastName, email, password, isAdmin, bookmarks } = req.body;

    const findUser = await User.findOne({ email });

    try {
      if (findUser) {
        return res.send({
          ok: false,
          message: "E-mail already registered in the databasesss",
        });
      }
      let userData = {
        firstName,
        lastName,
        email,
        password,
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
      const findUser = await User.findOne({ email });
      if (!findUser) {
        return res.status(404).send({
          ok: false,
          message: "User not found. ",
        });
      }

      return res.send({
        ok: true,
        data: findUser,
      });
    } catch (error) {
      res.status(500).send({ ok: false, error: "Error retrieving user" });
    }
  }

  // PATCH: FIND USER OR ADMIN AND UPDATE
  async findUserAndUpdate(req, res) {
    try {
      let _id = req.body._id;

      let userFoundAndUpdated = await User.findOneAndUpdate({ _id }, req.body, {
        new: true,
      });

      return res.send({ ok: true, data: userFoundAndUpdated });
    } catch (error) {
      console.log("couldn't find user");
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
}

module.exports = new UserController();
