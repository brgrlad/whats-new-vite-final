// CONNECT TO LOCAL SERVER HERE
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4004;

app.use(require("express").json());
app.use(require("express").urlencoded());
app.use(cors()); // Enable CORS

app.get("/random", (req, res) => {
  console.log(["request body:", req.body]);
  res.send("test from backend!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
