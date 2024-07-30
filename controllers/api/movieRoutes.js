const router = require('express').Router();
const { Movie, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      include: [{ model: Review }],
    });
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [{ model: Review }],
    });
    if (!movieData) {
      res.status(404).json({ message: 'No movie with this id!' });
    }
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

const checkMovieExists = async (userId, imdbMovieId) => {
  try {
    const movie = await Movie.findOne({
      where: {
        user_id: userId,
        imdb_movieid: imdbMovieId,
      },
    });
    return !!movie;
  } catch (error) {
    console.error('Error checking if movie exists:', error);
    return false;
  }
};

router.post('/', withAuth, async (req, res) => {
  const { imdb_movieid, title, poster, plot, urls } = req.body;
  const user_id = req.session.user_id;

  try {
    const movieExists = await checkMovieExists(user_id, imdb_movieid);
    if (movieExists) {
      return res
        .status(400)
        .json({ message: 'This movie is already in your profile.' });
    }

    const newMovie = await Movie.create({
      imdb_movieid: imdb_movieid,
      title: title,
      poster: poster,
      plot: plot,
      urls: urls,
      user_id: user_id,
    });

    res.status(200).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
