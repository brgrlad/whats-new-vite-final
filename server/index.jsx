// CONNECT TO LOCAL SERVER HERE
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4004;

app.use(require("express").json());
app.use(require("express").urlencoded());
app.use(cors());

const password = "FcD6k95rwUsJE66Q";

// if you dont't add the database name to the string (news-app in this case) mongo will automatically create one named test
const connectionString = `mongodb+srv://bgrecchi:${password}@cluster-one.uuhpyes.mongodb.net/news-app?retryWrites=true&w=majority&appName=cluster-one`;

let connection = async () => {
  try {
    let res = await mongoose.connect(connectionString);
    console.log("Connected to DB!");
  } catch (e) {
    console.log("Error connection to do DB");
    console.log("error", e);
  }
};

const usersSchema = new mongoose.Schema({
  name: String,
  age: String,
});

// first argument (users2) will be the name of the collection!!!!
const Users = mongoose.model("Users3", usersSchema);

let getUsers = async () => {
  try {
    const users = await Users.find();
    console.log("users?? >>>>", users);
  } catch (error) {
    console.log("error fetching", error);
  }
};

app.get("/random", (req, res) => {
  console.log(["request body:", req.body]);
  res.send("test from backend!");
});

connection().then(async () => {
  // const newUsers = new Users({
  //   name: "no news app",
  //   age: "30",
  // });

  // try {
  //   const savedUser = await newUsers.save();
  //   console.log("User saved successfully:", savedUser);
  // } catch (error) {
  //   console.log("Error saving user:", error);
  // }
  getUsers();

  // app.listen(port, () => {
  //   console.log(`connected to ${port}`);
  // });
});
