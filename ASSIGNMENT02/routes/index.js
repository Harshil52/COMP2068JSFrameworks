const express = require("express");
const router = express.Router();

// Importing passport and user
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Contact Management", user: req.user });
});

// GET method for Login Page
router.get("/login", function (req, res, next) {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login to ContactLync", messages: messages });
});

// POST method for Login Page
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/contacts",
    successMessage: "Login Successful",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

// GET method for register page
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register for ContactLync" });
});

// POST method for register page
router.post("/register", (req, res, next) => {
  // creating a new user 
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function (err, newUser) {
      // if error in creating user displaying error message
      if (err) {
        console.log(err);
        res.render("error", {
          message: "Your registration information is not valid",
        });
      } 
      // else logging in the user with password and username
      else {
        // logging the user in
        req.login(newUser, function (err) {
          res.redirect("/contacts");
        });
      }
    }
  );
});

// GET method for logout page 
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

// GET method for github login
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

// Authenticating Github
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    res.redirect("/contacts");
  }
);

// exporting the route
module.exports = router;
