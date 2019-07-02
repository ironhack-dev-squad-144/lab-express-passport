var GitHubStrategy = require('passport-github').Strategy;
const User          = require('../models/User');
const passport      = require('passport');  

passport.use(new GitHubStrategy({
  clientID: "c9c8680c54760ace2fdb",
  clientSecret: "9fa6e9c931b4fd74e9ffce194ecd9133f3bc0eda"
},
function(accessToken, refreshToken, profile, done) {
console.log("TCL: profil", profile)
  User.findOne({ githubUsername: profile.username }) .then(user => {
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      githubUsername: profile.username,
      profilePicture: profile.photos[0].value,
      githubUrl: profile.profileUrl
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(err=> {
    done(err)
  })
}));