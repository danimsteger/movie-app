const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MoviePost extends Model {}

MoviePost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    watch_location: {
      type: DataTypes.STRING,
    },
    movie_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
      max: 5,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'moviepost',
  }
);

module.exports = MoviePost;
