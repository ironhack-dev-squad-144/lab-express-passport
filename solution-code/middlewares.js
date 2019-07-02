function checkLogin(req, res, next) {
  if (req.user) next();
  else res.redirect("/auth/login");
}

function defineViewVariables(req, res, next) {
  console.log("My middleware");
  res.locals.x = 42; // Define a view variable named "x" with the value 42

  if (req.user) res.locals.isConnected = true
  else res.locals.isConnected = false

  next();
}

module.exports = {
  checkLogin,
  defineViewVariables
};
