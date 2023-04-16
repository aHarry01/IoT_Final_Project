// File:           server.js
// Description:    This is the server configuration file for the backend server (Node.JS and Express).
// Last Modified:  April 16th, 2023

const express = require("express"); // Express for handling GET and POST request
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const https = require('https'); 
const fs = require('fs'); // Requiring file system to use local files
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser"); // Parsing the form of body to take input from forms
const WebSocket = require('ws');

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

//GET requests that allow client to trigger 
//WebSocket messages server->server
var current_socket; 
var plantStatus;
// tell client to water the plant 
app.get('/waterPlant', (req, res) => {
  console.log('water the plant!');
  if (current_socket != null){
	current_socket.send('waterPlant');
	res.send('REQUEST SENT');
  } else {
	res.send('REQUEST FAILED - NO WEBSOCKET');
  }
});
// tell client to change the watering method
app.get('/waterMethodChange', (req, res) => {
  console.log('change watering method');
  if (current_socket != null){
	current_socket.send('wateringMethodChange:'+req.query.method);
	res.send('REQUEST SENT');
  } else {
	res.send('REQUEST FAILED - NO WEBSOCKET');
  }
});
// update client's alert/optimal levels 
app.get('/alertLevels', (req, res) => {
  console.log('change alert levels');
  if (current_socket != null){
	current_socket.send('alertLevelsChange:'+req.query.tempRange
						+ ':' + req.query.humidityRange
						+ ':' + req.query.soilMoisture
						+ ':' + req.query.sunlightExposureTime
						+ ':' + req.query.wateringTime);
	res.send('REQUEST SENT');
  } else {
	res.send('REQUEST FAILED - NO WEBSOCKET');
  }
});

// get plant status when loading webpage
// planStatus is a global variable that 
// is updated via the pi client over the WebSocket
app.get('/plantStatus', (req, res) => {
  console.log('get plant status');
  res.send(plantStatus);
});


// Initialize http & ws servers
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
	current_socket = ws;
	
	ws.on('error', console.error);

	ws.on('message', function message(data) {
		// Handle received WebSocket messages client->server
		//TODO: how to push this to the client tho without refreshing the page?
		console.log('received: %s', data);
		if(data.toString().split(':')[0] == "plantStatus"){
			plantStatus = data.toString().split(':')[1];
		}
	});

	ws.send('TESTING INITIAL CONN');
});

//start our server
const PORT = process.env.APP_PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});