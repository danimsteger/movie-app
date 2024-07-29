const express = require('express');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Review, User, Movie } = require('../models');

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
    });

    res.render('home', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/users/movies');
    return;
  }
  res.render('login');
});

router.get('/users/signup', async (req, res) => {
  res.render('signup');
});

router.get('/movies/search', async (req, res) => {
  res.render('search');
});

router.get('/reviews/new', async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    // });

    // const user = userData.get({ plain: true });
    // res.render('newReview', {
    //   ...user,
    //   logged_in: true,
    // });

    res.render('newReview', {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/reviews', withAuth, async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [
    //     { model: Movie, attributes: ['title', 'id', 'imdb_movieid'] },
    //     { model: Review, attributes: ['rating', 'review', 'movie_id'] },
    //   ],
    // });

    // const user = userData.get({ plain: true });

    // res.render('myReviews', {
    //   ...user,
    //   logged_in,
    // });

    res.render('myReviews', {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/movies', withAuth, async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.render('myMovies', {
      movies: movies.map((movie) => movie.get({ plain: true })),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [
        // {
        //   model: User,
        //   attributes: ['name'],
        // },
        {
          model: Review,
          attributes: [
            'rating',
            'review',
            'user_id',
            // 'date_created'
          ],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    const movie = await movieData.get({ plain: true });
    res.render('movie', {
      ...movie,
      logged_in: req.session.logged_in,
    });

    // res.render('movie');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
