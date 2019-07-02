const GitHubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: "user:email" // To ask for the email
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      User.findOne({ githubUsername: profile.username })
        .then(user => {
          if (user) {
            done(null, user); // To login the user
          } else {
            User.create({
              email: profile.emails.find(email => email.primary).value,
              githubUsername: profile.username,
              profilePicture: profile.photos[0].value
            }).then(newUser => {
              done(null, newUser); // To login newUser
            });
          }
        })
        .catch(err => done(err));
    }
  )
);
