const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
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
  res.render('newReview');
});

router.get('/users/reviews', async (req, res) => {
  try {
    res.render('myReviews');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/movies', async (req, res) => {
  try {
    res.render('myMovies');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    res.render('movie');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
