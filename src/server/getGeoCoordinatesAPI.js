// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
/* Global Variables */
//Base URL for MeaningCloud API 
const baseURL = 'http://api.geonames.org/geoCodeAddressJSON?';

// Personal API Key for OpenWeatherMap API
let userName = process.env.GEONAMES_LOGIN;


/* Function to GET data */
const getData = async (url='') => {
    const res = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};

const getGeoCodeAddress = async function(localityName){
    let result = getData(baseURL + "?q=" + localityName +'&username=' + userName);
    return result;
}

module.exports = getGeoCodeAddress;