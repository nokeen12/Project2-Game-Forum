// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);
// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "Project2-Game-Forum";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});
// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const profile = require("./routes/profile.routes");
app.use("/", profile)

const games = require("./routes/games.routes");
app.use("/", games)

const guides = require("./routes/guides.routes");
app.use("/", guides)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
