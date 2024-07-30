// Imports dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Imports routes
const routes = require('./controllers');

// Imports helpers
const helpers = require('./utils/helpers');

// Loads info in .env to store sensitive info safely
require('dotenv').config();

// Imports connection.js to establish connection to database
const sequelize = require('./config/connection');

// Connects sequelize database and session to store sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Handlebars.js with custom helpers
const hbs = exphbs.create({ helpers });

app.get('/api/keys', (req, res) => {
  res.json({
    OMDB_KEY: process.env.OMDB_KEY,
    WATCHMODE_KEY: process.env.WATCHMODE_KEY,
  });
});

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3000000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use sessions
app.use(session(sess));

// tells express to use handlebars for the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Allows app to parse requests with JSON
app.use(express.json());

// Allows app to parse requests with URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Allows app to use items in public directory (JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Imports routes from controllers
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
