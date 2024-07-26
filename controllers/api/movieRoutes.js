const router = require('express').Router();
const { Movie, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({
        include: [{model: Review}]
    });
    res.status(200).json(movieData)
  } catch (err) {
    res.status(500),json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [{model: Review}]
    });
    if (!movieData) {
      res.status(404).json({ message: 'No movie with this id!'});
    }
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newMovie = await Movie.create({
      imdb_movieid: req.body.imdb_movieid,
      title: req.body.title,
      poster: req.body.poster,
      plot: req.body.plot,
      urls: req.body.urls,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router