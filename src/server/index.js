// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/all', getData);
app.post('/addWeatherData', postData);

// Callback function to complete GET '/all'
function getData(req, res){
    res.send(projectData);
}
// Callback function to complete POST
function postData(req, res){
    const newData = req.body;
    projectData = {
        temperature: newData.temperature, 
        date: newData.date,
        userResponse: newData.userResponse
    };
    res.send(projectData);
}