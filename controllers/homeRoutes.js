const express = require('express');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Review, User, Movie } = require('../models');

// Gets model information for homepage to display 'home' handlebars view
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Movie,
          attributes: ['title', 'poster', 'urls', 'imdb_movieid', 'id', 'plot'],
        },
      ],
      order: [['date_created', 'DESC']],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('home', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Displays 'login' page if users are not logged in. Displays /users/movies if they are
router.get('/users/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/users/movies');
    return;
  }
  res.render('login');
});

// Displays 'signup' page
router.get('/users/signup', async (req, res) => {
  res.render('signup');
});

// Displays 'search' page
router.get('/movies/search', async (req, res) => {
  res.render('search', {
    logged_in: req.session.logged_in,
  });
});

// Displays 'newReview' page
router.get('/reviews/new', async (req, res) => {
  try {
    res.render('newReview', {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Checks if a user is logged in and gets review information for the logged-in user to display 'myReviews' page
router.get('/users/reviews', withAuth, async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Movie,
          attributes: ['title', 'id', 'imdb_movieid', 'poster', 'urls', 'plot'],
        },
      ],
      order: [['date_created', 'DESC']],
    });

    res.render('myReviews', {
      reviews: reviews.map((review) => review.get({ plain: true })),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Checks if a user is logged in and gets movie information for the logged-in user to display 'myMovies' page
router.get('/users/movies', withAuth, async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['id', 'DESC']],
    });
    res.render('myMovies', {
      movies: movies.map((movie) => movie.get({ plain: true })),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets movie and corresponding review information for a movie by id to display the individual 'movie' page
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    const imdb_movieid = movie.imdb_movieid;

    const moviesData = await Movie.findAll({
      where: {
        imdb_movieid: imdb_movieid,
      },
      include: [
        {
          model: Review,
          attributes: ['rating', 'review', 'user_id'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    const movies = await moviesData.map((movie) => {
      const plainMovie = movie.get({ plain: true });

      plainMovie.formattedUrls = plainMovie.urls || '';
      return plainMovie;
    });

    res.render('movie', {
      movies: movies,
      logged_in: req.session.logged_in,
    });
    console.log(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
