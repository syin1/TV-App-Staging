// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our models
var db = require('../models');
var request = require('request');
require('dotenv').config();

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the todos
  app.get('/api/watchedShows', function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Activity.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  app.get('/api/trendingMovies', function(req, res) {
    request(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=' +
        process.env.API_KEY,
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('----------------------------------------------------');
          console.log(
            'Background Image:',
            'https://image.tmdb.org/t/p/w500' +
              JSON.parse(body).results[0].backdrop_path
          );
          console.log(
            'Poster Image:',
            'https://image.tmdb.org/t/p/w400' +
              JSON.parse(body).results[0].poster_path
          );
          console.log('Title:', JSON.parse(body).results[0].title);
          console.log('Plot:', JSON.parse(body).results[0].overview);
          console.log(
            'Release Date:',
            JSON.parse(body).results[0].release_date
          );
          console.log('Popularity:', JSON.parse(body).results[0].popularity);
          console.log(
            'Vote Average:',
            JSON.parse(body).results[0].vote_average
          );
          console.log('----------------------------------------------------');
        }
      }
    );
  });

  // POST route for saving a new todo
  app.post('/api/watchedShows', function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Activity.create({
      showsWatched: req.body.showsWatched,
      showsDirector: req.body.showsDirector,
      showsActors: req.body.showsActors,
      showsGenre: req.body.showsGenre,
      showsRating: req.body.showsRating
    })
      .then(function(dbActivity) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbActivity);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  // app.delete('/api/todos/:id', function(req, res) {
  //   // We just have to specify which todo we want to destroy with "where"
  //   db.Activity.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbTodo) {
  //     res.json(dbTodo);
  //   });
  // });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put('/api/todos', function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Activity.update(
      {
        text: req.body.text,
        complete: req.body.complete
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(dbTodo) {
        res.json(dbTodo);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
