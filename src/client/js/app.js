import {hourlyCarousel, dailyCarousel} from './carousel.js';

/* Global Variables */
let latitude, longtitude, country, adminName, locationName;

// GET Backend Address
const getURL = '/getWeatherData';

// POST Backend Address
const postByCityURL = 'http://localhost:8080/fetchWeatherDataByCity';
const postByCoordinatesURL = 'http://localhost:8080/fetchWeatherDataByCoordinates';
const getGeoCoordinatesByIPURL = 'http://ip-api.com/json/';

/* Function called by event listener after clicking the daily forecast line item */
const onClick = async (event) => {
    event.preventDefault();
    const location = {
        countryName: country,
        adminName: adminName,
        locationName: locationName,
        lat: latitude,
        long: longtitude
    }
    const date = event.currentTarget.querySelector('.forecast_day_date').innerHTML;
    const res = postAPIData(postByCoordinatesURL, date, location)
                    .then(locationData => updateUI(locationData));
    return res;

}

/* Function called by event listener after clicking submit button */
const onSubmit = async (event) => {
    event.preventDefault();
    const location = document.querySelector('#location').value;
    const date = document.querySelector('#date').value;
    // const date2 = document.querySelector('#date2').value;
    const res = postAPIData(postByCityURL, date, location)
                    .then((locationData) => saveLocationData(locationData))
                    .then((locationData) => updateUI(locationData));
    return res;
}

/* Function called by event listener after the page is loaded */
const onLoad = async (event) => {   
    event.preventDefault();
    let date = new Date().toISOString().slice(0, 10);
    // let location;
    let result = getData(getGeoCoordinatesByIPURL)
                    .then((ipLocationData) => {
                        return {
                            countryName: ipLocationData.country,
                            adminName: ipLocationData.regionName,
                            locationName: ipLocationData.city,
                            lat: ipLocationData.lat,
                            long: ipLocationData.lon
                        }
                    })
                    .then((location) => postAPIData(postByCoordinatesURL, date, location))
                    .then((locationData) => saveLocationData(locationData))
                    .then(locationData => updateUI(locationData));
    return result;
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

/* Function to update location constants */
const saveLocationData = (locationData) => {
    latitude = locationData.location.lat;
    longtitude = locationData.location.long;
    country = locationData.location.countryName;
    adminName = locationData.location.adminName;
    locationName = locationData.location.locationName;
    return locationData;
}

/* Function to update UI */
const updateUI = async (locationData) => {
    // const weatherData = await getServerData(getURL);
    const country = locationData.location.countryName;
    const adminName = locationData.location.adminName;
    const locationName = locationData.location.locationName;

    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    const date = new Date(locationData.weather.date).toLocaleString("en-US", dateOptions);
    
    const time = locationData.weather.time;
    const temperature = locationData.weather.temperature;
    const feels_like = locationData.weather.feels_like;
    const wind = locationData.weather.wind;
    const humidity = locationData.weather.humidity;
    const pressure = locationData.weather.pressure;
    const weatherCode = locationData.weather.weather_code;
    const icon = locationData.weather.icon;

    // Filtering hourly data for selected date
    const hourly = locationData.weather_hourly.filter(h => h.date == locationData.weather.date);
    
    // Removing hourly buttons if hourly carousel is empty, enabling them otherwise 
    const prev = document.querySelector('.hourly-carousel__prev');
    const next = document.querySelector('.hourly-carousel__next');
    if(hourly.length == 0){
        prev.style.display = 'none';
        next.style.display = 'none';
    } else{
        prev.style.display = 'block';
        next.style.display = 'block';
    }

    const daily = locationData.weather_daily;

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
    document.querySelector("#time").innerHTML = time;
    document.querySelector("#temperature").innerHTML = temperature;
    document.querySelector("#feels_like").innerHTML = feels_like;
    document.querySelector("#wind").innerHTML = wind;
    document.querySelector("#humidity").innerHTML = humidity;
    document.querySelector("#pressure").innerHTML = pressure;
    document.querySelector("#weather_code").innerHTML = weatherCode;
    document.querySelector("#icon").src = icon;

    document.querySelector('#facts_hour_list').innerHTML = '';
    for(let i = 0; i < hourly.length; i++){


        let li = document.createElement('li');
        li.classList.add('facts_hour');
        let a1 = document.createElement('div');
        a1.classList.add('facts_hour_label');
        a1.innerHTML = hourly[i].time;
        let a2 = document.createElement('img');
        a2.classList.add('facts_icon_small');
        a2.src = hourly[i].icon;
        let a3 = document.createElement('div');
        a3.classList.add('facts_hour_temp');
        a3.innerHTML = hourly[i].temperature;
        li.appendChild(a1);
        li.appendChild(a2);
        li.appendChild(a3);
        document.querySelector('#facts_hour_list').appendChild(li);
    }
    hourlyCarousel.updateMaxPosition();

    document.querySelector('#forecast_daily_list').innerHTML = '';
    for(let i = 0; i < daily.length; i++){
        let li = document.createElement('li');
        li.classList.add('forecast_day');
        li.addEventListener('click', onClick)
        let a0 = document.createElement('div');
        a0.classList.add('forecast_day_date');
        a0.classList.add('hidden');
        a0.innerHTML = daily[i].date;
        let a1 = document.createElement('div');
        a1.classList.add('forecast_day_of_week');
        a1.innerHTML = daily[i].dayOfWeek;
        if(daily[i].dayOfWeek == 'Sat' || daily[i].dayOfWeek == 'Sun'){
            a1.classList.add('weekend');
        }
        let a2 = document.createElement('div');
        a2.classList.add('forecast_day_of_month');
        a2.innerHTML = daily[i].dayOfMonth;
        let a3 = document.createElement('img');
        a3.classList.add('forecast_day_icon_large');
        a3.src = daily[i].icon;
        let a4 = document.createElement('div');
        a4.classList.add('forecast_day_temp');
        a4.innerHTML = daily[i].temp_day;
        let a5 = document.createElement('div');
        a5.classList.add('forecast_night_temp');
        a5.innerHTML = daily[i].temp_night;
        let a6 = document.createElement('div');
        a6.classList.add('forecast_weather');
        a6.innerHTML = daily[i].conditions;
        li.appendChild(a0);
        li.appendChild(a1);
        li.appendChild(a2);
        li.appendChild(a3);
        li.appendChild(a4);
        li.appendChild(a5);
        li.appendChild(a6);
        document.querySelector('#forecast_daily_list').appendChild(li);
    }
    dailyCarousel.updateMaxPosition();

    document.querySelector('#factsSection').style.backgroundImage="url(media/"+image+")";
    document.querySelector('#imageSection').style.backgroundImage="url("+cityPicture+")";
    return;
}

export {onSubmit, onClick, onLoad};
