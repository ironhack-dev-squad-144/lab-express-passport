# Lab Express Passport

## Iteration 1: Setup

Clone the project, go inside the cloned folder and execute the following commands.

```sh
$ irongenerate --auth . # Generate an Express project with signup + login configured in the current folder
$ npm run dev # Run the project
```

Spend few minutes exploring the code to understand how things work.


## Iteration 2: Login with email and password

Right now, if you go to the signup or login page, you have to enter a "username" and "password". Change "username" by email.

Hints:
- Type `Cmd + Shift + F` and then search for "username" globally in your project. You have to replace the values by "email".
- The files you have to change are:
  - `bin/seeds.js`
  - `models/User.js`
  - `passport/localStrategy.js` => You have to write `usernameField: 'email'`
  - `routes/auth.js`
  - `views/login.hbs`
  - `views/signup.hbs`
  
![image](https://user-images.githubusercontent.com/5306791/60470897-1aac4d00-9c5a-11e9-82b6-a6fca0be5d7e.png)

  
  
## Iteration 3: Create a profile page
  
Create a "GET /profile" page with information about the connected user. This page has to be protected so that only connected users can access it.

## Iteration 4: Login with GitHub

In the navbar, add a link to log in with GitHub.

For this iteration, you can check the documentation for the package [`passport-github`](http://www.passportjs.org/packages/passport-github/).

You should also add two fields to your `User` model: `githubUsername` and `profilePicture`. These values should be filled when users log in with GitHub.

```js
// models/User.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  githubUsername: String,
  profilePicture: String, 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

## Iteration 5: Update the profile page

Edit the profile page to display the github username and the profile picture from GitHub.

**BONUS**: If the user doesn't have any GitHub username, add a button "*Link your account to GitHub*" that would edit the `githubUsername` and the `profilePicture`.


## Iteration 6: Edit the navbar

Edit the navbar to display "Login" and "Signup" when the user is disconnected and "Logout" when the user is connected.

For this, you have to use a middleware in your `app.js`, before your routes:
```js
app.use((req,res,next) => {
  // TODO: edit the code of this middleware
  req.locals.isConnected = true; // Define a view variable named "isConnected" with the value "true"
  next();
})
```

You should also modify your `layout.hbs` ;)
