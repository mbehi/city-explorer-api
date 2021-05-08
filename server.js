'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

// import the json file
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// most of your actual server definition goes here
// A server's job is to listen at some path for a particular method
// listening for GET requests at the path
app.get('/weather', (request, response) => {
  const allDailyForecasts = weatherData.data.map(day => new DailyForecast(day));
  response.send(allDailyForecasts);
});

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
