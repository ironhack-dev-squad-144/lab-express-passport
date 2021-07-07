const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/User");

const Const = require("./const");
const CLIENT_ID = Const.CLIENT_ID
const CLIENT_SECRET = Const.CLIENT_SECRET

passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("TCL: profile", profile);
      User.findOne({ githubUsername: profile.username }).then(user => {
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            githubUsername: profile.username,
            profilePicture: profile.photos[0].value,
            githubUrl: profile.profileUrl
          });
          newUser.save().then(user => {
            done(null, newUser);
          });
        }
      });
    }
  )
);
