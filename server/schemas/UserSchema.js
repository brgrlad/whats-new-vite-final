const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  bookmarks: { type: Array, required: false },
});

// The first argument (users) will be the name of the collection in DB.
const User = mongoose.model("users", userSchema);
module.exports = User;
