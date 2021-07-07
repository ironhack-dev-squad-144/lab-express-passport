const passport = require('passport');

require('./serializers');
require('./localStrategy');
require('./gitHubStrategy')

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}
