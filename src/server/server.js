// Import dependencies
const {getGeoCodeAddress, getLocalTime}= require('./getGeoCoordinatesAPI.js');
const {getCurrentWeatherData, getWeatherHourlyData} = require('./getWeatherAPI.js');
const getPictureData = require('./getPictureAPI.js');
const getCityData = require('./citiesAPI.js');

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
    constructor(date, time, temperature, feels_like, wind, humidity, pressure, weather_code, icon, image){
        this.date = date,
        this.time = time;
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

class WeatherMini {
    constructor(date, time, temperature, icon){
        this.date = date;
        this.time = time;
        this.temperature = temperature;
        this.icon = icon;
    }
}

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

app.post('/fetchWeatherData', async function(req, res){
    console.log(req.body);
    const str = encodeURI(req.body.location);
    let location;
    let weather;
    let time;
    let weather_hourly = [];
    let weatherDescription = JSON.parse(weatherCodesData);
    let weatherImage = JSON.parse(weatherTypesData);

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
        .then((location) => getLocalTime(location.lat, location.long))
        .then((t) => {
            time = t.time.substr(11,5);
        })
        .then(() => getCurrentWeatherData(location.lat, location.long))
        // .then(result => {
        //     return result.data.find(
        //         element => {return element.datetime.substring(0,10)==req.body.date;}
        //     )
        // })
        .then(result => {
            let w = result.data[0];
            // Parsing data about weather code

            weather = new Weather(
                w.datetime.substr(0,10),
                time,
                Math.round(w.temp) + '°', 
                Math.round(w.app_temp) + '°',
                Math.round(w.wind_spd) +' m/s',
                Math.round(w.rh) + ' %',
                Math.round(w.pres*0.75) + ' mmHg',
                weatherDescription[w.weather.code],
                `https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png`,
                weatherImage[w.weather.code]+'.jpg'
            );
            // console.log(weather);
        })
        .then(() => getWeatherHourlyData(location.lat, location.long))
        .then(result => {
            let w = result.data;
            let filteredArray = w.filter((element, index, array) => index % 4 == 0);
            for(let i = 0; i < 5; i++){
                let wi = filteredArray[i];
                let wn = new WeatherMini(
                    wi.timestamp_local.substr(0,10),
                    wi.timestamp_local.substr(11,5),
                    Math.round(wi.temp) + '°', 
                    `https://www.weatherbit.io/static/img/icons/${wi.weather.icon}.png`
                );
                weather_hourly.push(wn);
            }
        })
        .then( () => {
            let picture = getPictureData(str);
            return picture;
        })
        .then(picture => {
            return {
                location: location,
                weather: weather,
                weather_hourly: weather_hourly,
                picture: picture.hits[0].largeImageURL
            }
        })
        .then( r => {
            console.log(r);
            res.send(r);
        });
})