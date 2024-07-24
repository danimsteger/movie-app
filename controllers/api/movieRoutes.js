const router = require('express').Router();
const { Movie, Review } = require('../../models');

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

router.post('/', async (req, res) => {
  try {
    const movieData = await Movie.create(req.body);
    res.status(200).json(movieData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router