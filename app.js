require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const User = require("./models/User");


    

mongoose
  .connect('mongodb://localhost/lab-express-passport', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);

const {defineViewVariables} = require("./middlewares");
app.use(defineViewVariables);


const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

passport.use(new GitHubStrategy({
  clientID: "cc77660b866d68d2223a",
  clientSecret: "6394320f1e4b505b6432be9c29342fca1b9f06bd",
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log("profile: ", profile)

  User.findOne({ githubId: profile.id }).then(user => {
      if (user) {
        done(null, user);
        return
      }
      const newUser = new User({
        profileUrl: profile.profileUrl,
        githubUsername: profile.username,
        githubId: profile.id,
        profilePicture: profile.photos[0].value
      });
      newUser.save()
      .then(user => {
        done(null, newUser);
      })
    })
    .catch(error => {
      done(error)
    }) 
  }));
      

module.exports = app;
