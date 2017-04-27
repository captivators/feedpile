const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const routes = require('./routes');

const app = express();

// connect to our database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/feedpilelocal', function (err) {

// mongoose.connect('mongodb://localhost/feedpilelocal', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Connected to Database');
});

// Setup logger
app.use(morgan('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets
//app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '../public')));

//routes
routes(app);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
