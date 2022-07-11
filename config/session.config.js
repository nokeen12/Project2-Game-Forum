// require session
const session = require('express-session');

// using this middleware in the app.js,
// export it and have it receive a parameter
module.exports = app => {
  // required for the app when deployed to Heroku (in production)
  app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 300000 // 60 * 1000 ms === 1 min
      }
    })
  );
};
