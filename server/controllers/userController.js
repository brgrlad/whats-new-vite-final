const User = require("../schemas/UserSchema");

class UserController {
  // FIND USER
  async findAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.send({ ok: true, data: users });
      console.log("Users retrieved successfully");
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).send({ ok: false, error: "Error retrieving users" });
    }
  }
}

module.exports = new UserController();
