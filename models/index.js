const User = require('./User');
const Movie = require('./Movie');
const Review = require('./Review');
const MovieReview = require('./MovieReview');

Movie.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Movie, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Movie, {
  foreignKey: 'movie_id',
});

Movie.hasMany(Review, {
  foreignKey: 'movie_id',
  onDelete: 'RESTRICT',
});


module.exports = {
  User,
  Movie,
  Review,
  MovieReview,
};

