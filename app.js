const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;
// require mongoose
const mongoose = require("mongoose");

// middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect
mongoose.connect("mongodb://localhost:27017/aryanSecretsDB");

// schema = > email  password
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});
// model
var User = new mongoose.model("User", userSchema);

// routes
// home
app.get("/", (req, res) => {
  res.render("home");
});

// signup
app.get("/signup", (req, res) => {
  res.render("signup");
});


app.post("/signup", (req, res) => {
  // create a user
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err) => {
    if (!err) {
      res.render("secrets")
    } else {
      console.log("error while sining up => ", err);
    }
  });
});

// login
app.get("/login", (req, res) => {
  res.render("login");
});
// login
app.post("/login", (req, res) => {

    const email = req.body.email
    const password = req.body.password

    User.find({email:email},(err,foundUser)=>{
        if(!err){
            if(foundUser[0].password == password){
                res.render("secrets")
            }
            console.log(foundUser)
        }else{
            console.log(err)
        }
    })


});


// setupServer
app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
