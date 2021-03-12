/* Global Variables */

// GET Backend Address
const getURL = '/getWeatherData';

// POST Backend Address
const postURL = 'http://localhost:8080/fetchWeatherData';

/* Function called by event listener */
const onSubmit = async (event) => {
    event.preventDefault();
    const location = document.querySelector('#location').value;
    const date = document.querySelector('#date').value;
    const res = postAPIData(postURL, date, location)
                    .then((locationData)=>updateUI(locationData));
    return res;
}

/* Function to POST data */
const postAPIData = async (url='', date, location) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            location: location
        })
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
const updateUI = async (locationData) => {
    // const weatherData = await getServerData(getURL);
    const country = locationData.location.countryName;
    const adminName = locationData.location.adminName;
    const locationName = locationData.location.locationName;

    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    const date = new Date(locationData.weather.date).toLocaleString("en-US", dateOptions);
    const temperature = locationData.weather.temperature;
    const feels_like = locationData.weather.feels_like;
    const wind = locationData.weather.wind;
    const humidity = locationData.weather.humidity;
    const pressure = locationData.weather.pressure;
    const weatherCode = locationData.weather.weather_code;
    const icon = locationData.weather.icon;
    const image = locationData.weather.image;

    const cityPicture = locationData.picture;

    // const date = weatherData.date;
    // const response = weatherData.userResponse;
    document.querySelector('#country').innerHTML = country; 
    document.querySelector('#adminName').innerHTML = adminName;
    let location_nodes = document.querySelectorAll('.location_name');
    for(let i = 0; i < location_nodes.length; i++){
        location_nodes[i].innerHTML = locationName;
    }

    document.querySelector("#facts_date").innerHTML = date;
    document.querySelector("#temperature").innerHTML = temperature;
    document.querySelector("#feels_like").innerHTML = feels_like;
    document.querySelector("#wind").innerHTML = wind;
    document.querySelector("#humidity").innerHTML = humidity;
    document.querySelector("#pressure").innerHTML = pressure;
    document.querySelector("#weather_code").innerHTML = weatherCode;
    document.querySelector("#icon").src = icon;
    document.querySelector('#factsSection').style.backgroundImage="url(media/"+image+")";

    document.querySelector('#imageSection').style.backgroundImage="url("+cityPicture+")";
    return;
}

export {onSubmit};
