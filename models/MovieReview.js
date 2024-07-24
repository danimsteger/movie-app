const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class MovieReview extends Model {}

MovieReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'review',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie_review',
  }
);

module.exports = MovieReview;
