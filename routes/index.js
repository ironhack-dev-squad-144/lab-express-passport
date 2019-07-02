const express = require('express');
const router  = express.Router();

const { checkLogin } = require("../middlewares");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/me", checkLogin, (req, res, next) => {
  console.log(req.user)
  res.render("me", {user: req.user});
  
});


module.exports = router;

