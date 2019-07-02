const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middlewares");

router.get("/", (req, res, next) => {
  res.render("index", { x: 42 });
});

router.get("/profile", checkLogin, (req, res, next) => {
  res.render("profile", { user: req.user }); // When connected, req.user is defined
});

module.exports = router;
