const { Model, DataTypes } = require("sequelize");
// Set up a config file
const sequelize = require("../config/connection.js");

// //creating columns for recipes db
class Recipes extends Model {}
Recipes.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },

  recipe_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4],
    },
  },

  recipe_nationality: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      len: [2],
    },
  },

  upvote: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },

  downvote: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
});
