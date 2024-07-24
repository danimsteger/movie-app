const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class MovieWatched extends Model {}

MovieWatched.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movie',
        key: 'id',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie_watched',
  }
);

module.exports = MovieWatched;
