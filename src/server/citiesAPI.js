// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

/* Global Variables */
//Base URL for Weatherbit API 
const baseURL = 'https://parseapi.back4app.com/classes/Continentscountriescities_City?order=name';

// Personal API Key for Weatherbit API
const where = encodeURIComponent(JSON.stringify({
    "country": {
      "__type": "Pointer",
      "className": "Continentscountriescities_Country",
      "objectId": "Cyprus"
    }
}));


/* Function to GET data */
const getData = async (url='') => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'x5yGgKLzuKWrY7GrohzwYWbtHSW7W1GyvZKsQSPh',
            'X-Parse-REST-API-Key': 'H5DhrEaJs4KXZIHpdJgbKL65ThB7rBkwpc687yCE',
        },
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};


const getCityData = async function(param){
    let result = getData(baseURL + '&where=' + where);
    return result;
}

// 
getCityData().then((res) => console.log(res));


module.exports = getCityData;