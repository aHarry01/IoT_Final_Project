// File:           server.js
// Description:    This is the server configuration file for the backend server (Node.JS and Express).
// Last Modified:  April 12th, 2023

const express = require("express"); // Express for handling GET and POST request
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https'); 
const fs = require('fs'); // Requiring file system to use local files
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser"); // Parsing the form of body to take input from forms

// Configuration of the .env file
dotenv.config();

const corsOptions ={
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Views for PUG
app.use(express.static("static"));
app.set('view engine', 'pug'); 
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));

// Configuring express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get Home Page for the Backend Server
app.get('/', (req, res) => {
  res.render('home', {
    title: 'ECSE 4660 Final Project',
  });
});

// REST API routes
require("./routes/app.routes")(app);

// Set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});