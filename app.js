require("dotenv").config(); 
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const saltRounds = 10;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "the most wanted secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema(
{
  userid : String,
  userPass : String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model( "User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
  res.render("home");
})



app.listen(9000);
