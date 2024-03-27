// CONNECT TO LOCAL SERVER HERE
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4004;

app.use(require("express").json());
// app.use(require("express").urlencoded());
app.use(cors());

const password = "FcD6k95rwUsJE66Q";

// if you dont't add the database name to the string (news-app in this case) mongo will automatically create one named test
const connectionString = `mongodb+srv://bgrecchi:${password}@cluster-one.uuhpyes.mongodb.net/news-app?retryWrites=true&w=majority&appName=cluster-one`;

let connection = async () => {
  try {
    let res = await mongoose.connect(connectionString);
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Error connection to do DB", error);
  }
};

const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

connection()
  .then(async () => {
    app.listen(port, () => {
      console.log(`connected to ${port}`);
    });
  })
  .catch((error) => {
    console.log("error starting server", error);
  });
