const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
//const checkLogin = require("../middlewares");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/profile", (req, res, next) => {
  let user = req.user;
  let logged = res.locals.isConnected;
  if (user) {
    res.render("profile", {user, logged});
  } else {
    res.render("auth/login", { "message": req.flash("error") });
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


// Route GET /auth/github
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: "/auth/profile",
    failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
