// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

/* Global Variables */
//Base URL for Weatherbit API 
const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';

// Personal API Key for Weatherbit API
let key = process.env.WEATHERBIT_API;


/* Function to GET data */
const getData = async (url='') => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};


const getWeatherData = async function(lat, lon){
    let result = getData(baseURL + "?key=" + key +'&lat=' + lat+'&lon=' + lon);
    return result;
}

// 
getWeatherData(55.94958, 37.50183).then((res) => console.log(res));
// 
// console.log("getGeoCoordinatesAPI.js:")
// let result = await getGeoCodeAddress('Moscow');
// console.log(result);


module.exports = getWeatherData;