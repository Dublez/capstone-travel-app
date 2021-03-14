// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

/* Global Variables */
//Base URL for Geonames API 
const getGeoCoordinatesURL = 'http://api.geonames.org/searchJSON?maxRows=100&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLC&featureCode=PPL&fuzzy=0.8';
const getLocalTimeURL = 'http://api.geonames.org/timezoneJSON';

// Personal API Key for Geonames API
let userName = process.env.GEONAMES_LOGIN;


/* Function to GET data */
const getData = async (url='') => {
    const res = await fetch(url, {
        method: 'GET',
        // headers: headers
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};


const getGeoCodeAddress = async function(localityName){
    let result = getData(getGeoCoordinatesURL + "&name=" + localityName +'&username=' + userName);
    return result;
}

const getLocalTime = async function(lat, long){
    let result = getData(getLocalTimeURL + "?lat=" + lat + "&lng=" + long + "&username=" + userName);
    return result;
}

// 
// getGeoCodeAddress('Lubertsy').then((res) => console.log(res));
// getLocalTime('55.67719','37.89322').then((res) => console.log(res));
// 
// console.log("getGeoCoordinatesAPI.js:")
// let result = await getGeoCodeAddress('Moscow');
// console.log(result);


module.exports = {getGeoCodeAddress, getLocalTime};