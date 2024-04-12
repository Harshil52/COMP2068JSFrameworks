const express = require("express");
const router = express.Router();

//Importing passport and user
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Contact Management", user: req.user });
});

router.get("/login", function (req, res, next) {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login to ContactLync", messages: messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/contacts",
    successMessage: "Login Successful",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register for ContactLync" });
});

router.post("/register", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function (err, newUser) {
      if (err) {
        console.log(err);
        res.render("error", {
          message: "Your registration information is not valid",
        });
      } else {
        // logging the user in
        req.login(newUser, function (err) {
          res.redirect("/contacts");
        });
      }
    }
  );
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    res.redirect("/contacts");
  }
);

module.exports = router;
