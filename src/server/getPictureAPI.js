// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

/* Global Variables */
//Base URL for Weatherbit API 
const baseURL = 'https://pixabay.com/api/';

// Personal API Key for Weatherbit API
let key = process.env.PIXABAY_API;


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


const getPictureData = async function(param){
    let result = getData(baseURL + "?key=" + key +'&q=' + param);
    return result;
}

// 
// getPictureData('Moscow').then((res) => console.log(res));

module.exports = getPictureData;