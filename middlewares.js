/* const express = require('express');
const app  = express.Router(); */

//Configure

function defineViewVariables(req, res, next) {
  
    if (req.user) 
    { res.locals.isConnected = true; }
    // Define a view variable named "isConnected" with the value "true"
    else 
    {res.locals.isConnected = false;}
    next();
  }




function checkLogin(req, res, next) {
  if (req.user) next();
  else res.redirect("/auth/login");
}

module.exports = {checkLogin, defineViewVariables};

