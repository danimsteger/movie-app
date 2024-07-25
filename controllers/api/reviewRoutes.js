const router = require('express').Router();
const { Review, User, Movie } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: Movie }, { model: User }],
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
