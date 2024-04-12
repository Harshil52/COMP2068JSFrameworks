const express = require('express');
const router = express.Router();

//Importing passport and user
var passport = require("passport");
var user = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Management' });
});

router.get("/login", function (req, res, next) {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", {title: "Login to ContactLync", messages : messages});
});

router.post("/login", passport.authenticate("local", {
  successRedirect : "/contacts",
  failureRedirect : "/login",
  failureMessage : "Invalid Credentials"
}));

router.get("/register", function(req, res, next){
  res.render("register", {title: "Register for ContactLync"});
});

router.post("/register", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        // returning the user back to reload the register page
        return res.redirect("/register");
      } else {
        // logging the user in
        req.login(newUser, (err) => {
          res.redirect("/contacts");
        });
      }
    }
  );
});

module.exports = router;
