const router = require('express').Router();
const { Model } = require('sequelize');
const { User } = require('../../models');

// Get all user api route
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500), json(err);
  }
});

// Get a user by id api route
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adds a user to the database
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a logged in session for a user by finding a user with a certain email and checking if the password inputed matches that corresponding email
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email, please try again' });
      console.log('this email isnt right');
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      console.log('you are now logged in!!');
      console.log(req.session.logged_in);
    });
  } catch (err) {
    res.status(200).json(err);
  }
});

// Ends a logged in session for a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
