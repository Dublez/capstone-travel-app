const fetch = require('node-fetch');

/* Global Variables */
//Base URL for IP API 
const getGeoCoordinatesByIPURL = 'http://ip-api.com/json/';


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


const getGeoCoordinatesByIP = async function(){
    let result = getData(getGeoCoordinatesByIPURL);
    return result;
}

getGeoCoordinatesByIP().then((res) => console.log(res));

module.exports = {getGeoCoordinatesByIP};