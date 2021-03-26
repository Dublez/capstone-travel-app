// Import dependencies
const {getGeoCodeAddress, getLocalTime}= require('./getGeoCoordinatesAPI.js');
const {getWeatherHourlyData, getWeatherForecastData} = require('./getWeatherAPI.js');
const getPictureData = require('./getPictureAPI.js');
// const getCityData = require('./citiesAPI.js');
const {getGeoCoordinatesAPI} = require('./getGeoCoordinatesByIPAPI.js');
const dateFormat = require('dateformat');

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

class WeatherHourly {
    constructor(date, time, temperature, icon){
        this.date = date;
        this.time = time;
        this.temperature = temperature;
        this.icon = icon;
    }
}

class WeatherDaily {
    constructor(date, dayOfMonth, dayOfWeek, temp_day, temp_night, conditions, icon){
        this.date = date;
        this.dayOfMonth = dayOfMonth;
        this.dayOfWeek = dayOfWeek;
        this.temp_day = temp_day;
        this.temp_night = temp_night;
        this.conditions = conditions;
        this.icon = icon;
    }
}

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

app.post('/fetchWeatherDataByCity', async function(req, res){
    console.log(req.body);
    const str = encodeURI(req.body.location);
    let location;

    const u0 = await getGeoCodeAddress(str)
        .then((result) => 
        {
            let l = result.geonames[0];
            location = new Location(l.countryName, l.adminName1, l.name, l.lat, l.lng);
            return location;
        })
        .then((location) => getDataByLocation(location, str, req.body.date))
        .then( r => {
            console.log(r);
            res.send(r);
        });
})

app.post('/fetchWeatherDataByCoordinates', async function(req, res){
    l = req.body.location;
    let location = new Location(l.countryName, l.adminName, l.locationName, l.lat, l.long);
    await getDataByLocation(location, location.locationName, req.body.date)
        .then(r => {
            console.log(r);
            res.send(r);
        })
})

const getDataByLocation = async (location, cityName, forecastDate) => {
    let weather;
    let time;
    let weather_hourly = [];
    let weather_daily = [];
    let weatherDescription = JSON.parse(weatherCodesData);
    let weatherImage = JSON.parse(weatherTypesData);
    let r;
    await getLocalTime(location.lat, location.long)
        .then((t) => {
            // If forecast date is today then 'time' will be rendered, otherwise it will be hidden
            console.log(t);
            if(t.time.substr(0,10) == forecastDate){
                time = t.time.substr(11,5);
            }
            else{
                time = '';
            }
        }
        )
        .then(() => getWeatherHourlyData(location.lat, location.long))
        .then(result => {
            let w = result.data;
            let filteredArray = w;
            // let filteredArray = w.filter((element, index, array) => index % 4 == 0);
            for(let i = 0; i < w.length; i++){
                let wi = filteredArray[i];
                let wn = new WeatherHourly(
                    wi.timestamp_local.substr(0,10),
                    wi.timestamp_local.substr(11,5),
                    Math.round(wi.temp) + '°', 
                    `https://www.weatherbit.io/static/img/icons/${wi.weather.icon}.png`
                );
                weather_hourly.push(wn);
            }
        })
        .then( () => getWeatherForecastData(location.lat, location.long))
        .then(result => {
            let w = result.data;
            for(let i = 0; i < w.length; i++){
                let wi = w[i];
                let d = new Date(wi.datetime);
                let month = dateFormat(d, "mmmm");
                let date = dateFormat(d, "d");
                let day = dateFormat(d, "ddd");
                let wn = new WeatherDaily(
                    wi.datetime,
                    month + " " + date,
                    day,
                    Math.round(wi.high_temp) + '°', 
                    Math.round(wi.low_temp) + '°',
                    wi.weather.description,
                    `https://www.weatherbit.io/static/img/icons/${wi.weather.icon}.png`
                );
                weather_daily.push(wn);
            }
            return result;
        })
        .then(result => result.data.find(
                element => {return element.datetime.substring(0,10)==forecastDate;})
            )
        .then(result => {
            let w = result;
            // Parsing data about weather code

            weather = new Weather(
                w.datetime.substr(0,10),
                time,
                Math.round(w.temp) + '°', 
                Math.round(w.app_max_temp) + '°',
                Math.round(w.wind_spd) +' m/s',
                Math.round(w.rh) + ' %',
                Math.round(w.pres*0.75) + ' mmHg',
                weatherDescription[w.weather.code],
                `https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png`,
                weatherImage[w.weather.code]+'.jpg'
            );
        })
        .then( () => getPictureData(cityName))
        .then(picture => {
            r = {
                location: location,
                weather: weather,
                weather_hourly: weather_hourly,
                weather_daily: weather_daily,
                picture: picture.hits[0].largeImageURL
            }
        });
        return r;
}