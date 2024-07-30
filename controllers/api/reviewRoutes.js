const router = require('express').Router();
const { Review, User, Movie } = require('../../models');
const withAuth = require('../../utils/auth');

// Gets all reviews api route
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll();
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Gets review by id api route
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [{ model: Movie }, { model: User }],
    });
    if (!reviewData) {
      res.status(404).json({ message: 'No review with this id!' });
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adds a review to the database
router.post('/', async (req, res) => {
  try {
    console.log('Attempting to add new Review');
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
    console.log('Adding a review isnt working');
  }
});

// Deletes a review by id from the database
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'no review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
