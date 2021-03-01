# Travel App Project

## Overview
This project was built as a capstone for Udacity Front-End Nanodegree in order to have more hands-on experience in the following technologies:
- Html & page layout using Flexbox and Grid
- CSS and Sass
- Javascript, including asynchronous code
- Webpack
- Testing using Jest
- Service workers
- Using APIs and creating requests to external urls 

## Getting Started

In order to launch the project
* Make fork of this repository or, alternatively, copy and un-zip the project into your local machine
* Install [Node Package Manager (npm)](https://nodejs.org/en/download/)
* Install [Git Bash](https://git-scm.com/download/win)
* Create an account on [GeoNames](http://www.geonames.org/export/web-services.html)
* Create an account on [Weatherbit](https://www.weatherbit.io/account/create)
* Create an account on [Pixabay](https://pixabay.com/api/docs/)
* Create a .env file in the project root directory. Save your GeoNames, Weatherbit and Pixabay API codes in the .env file like this:
```.env
GEONAMES_KEY=...
WEATHERBIT_KEY=...
PIXABAY_KEY=...
```  
* Install all dependencies. In your Git Bash console by using the following command
```bash
npm install
``` 
* Build the project. In your Git Bash console type the build command:
```bash
npm run build-prod
```
* Run the project.
```bash
npm run start
```
* Access the app by typing in your browser: localhost:8080

## Built With

This project is built with 
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Webpack](https://webpack.js.org/) - The build tool
* [Jest](https://jestjs.io) - Testing tool

## Authors

* **Nikita Ivanov** - *Initial work* - [Dublez](https://github.com/)

## License

This project is licensed under the MIT License
