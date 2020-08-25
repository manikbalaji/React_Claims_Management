const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
let claims = require("./model");
const PORT = 4000;
app.use(cors());

const router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/claims", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

// app.get('/', (req, res) => res.send('Hello World!'));

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

router.route("/getClaims").get(function(req, res) {
    claims.find({}, {_id:0}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

app.use("/", router);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});