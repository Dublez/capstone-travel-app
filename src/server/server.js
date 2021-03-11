// Import dependencies
const getGeoCodeAddress = require('./getGeoCoordinatesAPI.js');
const getWeatherData = require('./getWeatherAPI.js');

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

// File System module to read data from files
const fs = require('fs');
let weatherCodesData = fs.readFileSync('weatherCodes.json');
let weatherTypesData = fs.readFileSync('weatherTypes.json');

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const PORT = process.env.PORT || 8080;

// Spin up the server
const server = app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})

// Initialize all route with a callback function
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname});
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

class Location {
    constructor(countryName, adminName, locationName, lat, long){
        this.countryName = countryName;
        this.adminName = adminName;
        this.locationName = locationName;
        this.lat = lat;
        this.long = long;
    }
}

class Weather {
    constructor(temperature, feels_like, wind, humidity, pressure, weather_code, icon, image){
        this.temperature = temperature;
        this.feels_like = feels_like;
        this.wind = wind;
        this.humidity = humidity;
        this.pressure = pressure;
        this.weather_code = weather_code;
        this.icon = icon;
        this.image=image;
    }
}

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

app.post('/fetchWeatherData', async function(req, res){
    console.log(req.body);
    const str = encodeURI(req.body.location);
    let location;
    const u0 = await getGeoCodeAddress(str)
        .then((result) => 
        {
        // console.log(result);
            let l = result.geonames[0];
            location = new Location(l.countryName, l.adminName1, l.name, l.lat, l.lng);
            // res.send(location);
            // 
            // console.log(location);
            return location;
        })
        .then((location) => getWeatherData(location.lat, location.long))
        .then((result) => {
            let w = result.data[0];
            
            // Parsing data about weather code
            let weatherDescription = JSON.parse(weatherCodesData);
            let weatherImage = JSON.parse(weatherTypesData);

            let weather = new Weather(
                Math.round(w.temp) + '°', 
                Math.round(w.app_temp) + '°',
                Math.round(w.wind_spd) +' m/s',
                Math.round(w.rh) + ' %',
                Math.round(w.pres*0.75) + ' mmHg',
                weatherDescription[w.weather.code],
                `https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png`,
                weatherImage[w.weather.code]+'.jpg'
            );
            return {
                location: location,
                weather: weather
            };
            // console.log(weather);
        })
        .then( r => {
            console.log(r);
            res.send(r);
        });
})