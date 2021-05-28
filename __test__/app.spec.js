// Describe function has two arguments: a string description and a test suite as a callback function.
// A test suite may contain one or more related tests
import 'regenerator-runtime/runtime';

describe("Testing the app.js functionality", () => {
    test("Testing the onClick functionality", () => {

        let latitude = '55.67719';
        let longtitude = '37.89322';
        let country = 'Russia';
        let adminName = 'Moscow Oblast';
        let locationName = 'Lubertsy';


        document.body.innerHTML = 
        '<div class="main1">'+
            '<section id="factsSection" class="section">'+
                '<div class="factsTitle facts">'+
                    '<h2>Weather in <span class="location_name"></span></h2>'+
                '</div>'+
                '<div class="factsTime facts">'+
                    '<span id="facts_date"></span>'+
                    '<span id="time"></span>'+
                '</div>'+
                '<div class="facts_spacer facts"></div>'+
                '<div class="facts_temp_wrap facts">'+
                    '<span class="facts_temp" id="temperature"></span>'+
                    '<img class="facts_icon_large" id="icon" src="http://openweathermap.org/img/wn/02d@2x.png">'+
                    '<div class="feels_wrap">'+
                    '<div class="sky" id="weather_code"></div>'+
                    '<div class="feels">'+
                        '<div class="feels_label">Feels like</div>'+
                        '<span class="feels_unit" id="feels_like"></span>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<div class="facts_spacer facts"></div>'+
                '<div class="facts_conditions_wrap facts">'+
                    '<div class="wind_wrap condition">'+
                        '<div class="wind_title">Wind</div>'+
                        '<div class="wind_value" id="wind"></div>'+
                    '</div>'+
                    '<div class="humidity_wrap condition">'+
                        '<div class="humidity_title">Humidity</div>'+
                        '<div class="humidity_value" id="humidity"></div>'+
                    '</div>'+
                    '<div class="pressure_wrap condition">'+
                        '<div class="pressure_title">Pressure</div>'+
                        '<div class="pressure_value" id="pressure"></div>'+
                    '</div>'+
                '</div>'+
                '<div class="facts_spacer facts spacer_line"></div>'+
                '<div class="hourly_wrapper">'+
                '<button class="hourly-carousel__prev"></button>'+
                '<div id="hourly-carousel" class="js-carousel">'+
                    '<ul id="facts_hour_list">'+
                        '<li class="facts_hour">'+
                            '<div class="facts_hour_label"></div>'+
                            '<img class="facts_icon_small">'+
                            '<div class="facts_hour_temp"></div>'+
                        '</li>'+
                    '</ul>'+
                '</div>'+
                '<button class="hourly-carousel__next"></button>'+
                '</div>'+
            '</section>'+
            '<section id="imageSection" class="section">'+
                '</div>'+
                '<div class="main2">'+
                    '<section id="forecastSection" class="section">'+
                        '<div class="fc_title">'+
                            '<h2>Weather Forecast for 16 days</h2>'+
                        '</div>'+
                        '<div class="daily_wrapper">'+
                            '<button class="daily-carousel__prev"></button>'+
                            '<div id="daily_carousel">'+
                                '<ul id="forecast_daily_list">'+
                                    '<li class="forecast_day">'+
                                        '<div class="forecast_day_date hidden">2021-03-27</div>'+
                                        '<div class="forecast_day_of_week">Sat</div>'+
                                        '<div class="forecast_day_of_month">March 27</div>'+
                                        '<img class="forecast_day_icon_large" src="https://www.weatherbit.io/static/img/icons/c02d.png">'+
                                        '<div class="forecast_day_temp">4°</div>'+
                                        '<div class="forecast_night_temp">-4°</div>'+
                                        '<div class="forecast_weather">Few clouds</div>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                            '<button class="daily-carousel__next"></button>'+
                        '</div>'+
            '</section>'+
        '</div>';
        let app = require("../src/client/js/app");

        expect(app.onClick).toBeDefined();
        const clickEvent = new MouseEvent('click');
        const target = document.querySelector('.forecast_day');
        Object.assign(clickEvent, {preventDefault: jest.fn()});
        Object.defineProperty(clickEvent, 'target', {value: target, enumerable: true});
        const click = jest.spyOn(app, 'onClick');

        app.onClick(clickEvent);
        expect (click).toHaveBeenCalledTimes(1);
        expect (clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    })
})