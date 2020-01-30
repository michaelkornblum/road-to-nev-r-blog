// Application variables
require('dotenv').config();

// Native node modules
const path = require('path');

// Express server module
const express = require('express');

// Middleware modules
const bodyParser = require('body-parser');

// Route modules
const categoryRoutes = require('./routes/category');
const fieldRoutes = require('./routes/field');
const entryRoutes = require('./routes/entry');

// Create express server
const app = express();

// Set server port from dotenv file
const port = process.env.PORT || 3000;

// Set templating engine
app.set('view engine', 'pug');

// Use Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(categoryRoutes);
app.use(fieldRoutes);
app.use(entryRoutes);

// Use 404 Error page
app.use((req, res) =>
	res.status(404).render('404', { pageTitle: 'Page Not Found' }),
);

// Start server
app.listen(port, () => console.log(`Rockin' like Dokken on port ${port}!!!`));
