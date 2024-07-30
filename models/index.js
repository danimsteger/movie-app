const User = require('./User');
const Movie = require('./Movie');
const Review = require('./Review');
const MovieWatched = require('./MovieWatched');

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

Movie.belongsToMany(User, {
  through: {
    model: MovieWatched,
    unique: false
  },
  as: 'watched_movies'
});

User.belongsToMany(Movie, {
  through: {
    model: MovieWatched,
    unique: false
  },
  as: 'user_watched'
});


module.exports = {
  User,
  Movie,
  Review,
  MovieWatched,
};

