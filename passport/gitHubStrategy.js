const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: "5f06fb4f52c44e3a7847",
      clientSecret: "4da96505477f7ca9bfd51de6dfc77f287991bd3d"
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
