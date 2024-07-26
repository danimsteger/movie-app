const router = require('express').Router();
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
          attributes: ['title'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('home', {
      reviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/login', async (req, res) => {
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

    res.render('newReview');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/reviews', async (req, res) => {
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

    res.render('myReviews');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/movies', async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Movie, attributes: ['title', 'id', 'imdb_movieid'] }],
    // });

    // const user = userData.get({ plain: true });
    // res.render('myMovies', {
    //   ...user,
    //   logged_in: true,
    // });

    res.render('myMovies');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    // const movieData = await Movie.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //     {
    //       model: Review,
    //       attributes: ['rating', 'review', 'date_created'],
    //     },
    //   ],
    // });

    // const movie = await movieData.get({ plain: true });
    // res.render('movie', {
    //   ...movie,
    //   logged_in: req.session.logged_in,
    // });

    res.render('movie');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
