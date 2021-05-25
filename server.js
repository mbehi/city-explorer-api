'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');


// activing the express library and middleware function
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// most of your actual server definition goes here
// A server's job is to listen at some path for a particular method
// listening for GET requests at the path

app.get('/', (request, response) => {
  response.send('I am looking to retrieve the weather day.');
});
app.get('/weather', (request, response) => {
  superagent.get(`${process.env.WEATHER_API_KEY}/daily?lat=${request.query.lat}&lon=${request.query.lon}$key=${process.env.WEATHER_API_KEY}`)
    .then(response => response.body.data)
    .then(data => data.map(dailyWeatherForecast => new DailyForecast(dailyWeatherForecast)))
    .then(result => response.send(result));
});
app.get('/movies', (request, response) => {
  superagent.get(`${process.env.MOVIE_URI}/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.location}`)
    .then(response => response.body.results)
    .then(movies => movies.map(movie => new Movie(movie)))
    .then(result => response.send(result));
});
function DailyForecast(day) {
  this.date = day.datetime;
  this.description = `Todays Low${day.low_temp} and Todays High of ${day.high_temp} with ${day.weather.description}`;
}
function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `${process.env.MOVIE_IMG_PREFIX_URI}${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
