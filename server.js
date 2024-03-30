const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/home-routes');
const path = require('path');

// Import express-handlebars
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3001;
const app = express();

// Configure Handlebars as the view engine
const hbs = exphbs.create({ 
  defaultLayout: 'main', // Specify the default layout file
  layoutsDir: path.join(__dirname, 'views', 'layouts'), // Specify the directory for layout files
  partialsDir: path.join(__dirname, 'views', 'partials'), // Specify the directory for partial files
  // Disable prototype access check for Handlebars
  // See: https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
