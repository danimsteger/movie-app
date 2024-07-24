const User = require('./User');
const MoviePost = require('./MoviePost');

User.hasMany(MoviePost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

MoviePost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, MoviePost };
