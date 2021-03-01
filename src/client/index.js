/* Global Variables */
//Base URL for OpenWeatherMap API 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';

// Personal API Key for OpenWeatherMap API
const key = '&APPID=36d7234802a84134f886ebad20d776d0';

// GET Backend Address
const getURL = '/all';

// POST Backend Address
const postURL = '/addWeatherData';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
const onGenerate = async () => {
    const zip = document.querySelector('#zip').value;
    const res = getAPIData(baseURL,zip,key)
                    .then(weatherData => postServerData(postURL, weatherData))
                    .then(()=>updateUI());
    return res;
}

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click',onGenerate);

/* Function to GET Web API Data*/
const getAPIData = async (baseURL='', zip='', key='') => {
    const res = await fetch(baseURL+zip+key);
    try{
        const weatherData = await res.json();
        const userResponse = document.querySelector('#feelings').value;
        return {
            temperature: weatherData.main.temp,
            date: new Date(weatherData.dt * 1000),
            userResponse: userResponse,
        };
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postServerData = async (url='', weatherData) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData)
    });
    try {
        const weatherDataPosted = await res.json();
        return weatherDataPosted;
    } catch (error) {
        console.log('error', error);
    }
};


/* Function to GET Project Data */
const getServerData = async (url='') => {
    const res = await fetch(url);
    try{
        const weatherData = await res.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to update UI */
const updateUI = async () => {
    const weatherData = await getServerData(getURL);
    const temperature = weatherData.temperature;
    const date = weatherData.date;
    const response = weatherData.userResponse;
    document.querySelector('#date').innerHTML = date; 
    document.querySelector('#temp').innerHTML = temperature+' Fr';
    document.querySelector('#content').innerHTML = response;
    return;
}