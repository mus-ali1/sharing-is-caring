const { Model, DataTypes } = require("sequelize");
// Set up a config file
const sequelize = require("../config/connection.js");

// //creating columns for recipes db
class Recipe extends Model { }

Recipe.init(
  {
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
      allowNull: true,
      validate: {
        len: [4],
      },
    },

    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cooking_instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    recipe_nationality: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [2],
      },
    },

    // recipe_instruction: {
    //   type: DataTypes.TEXT,
    //   allowNull: false
    // },

    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    sequelize,
    modelName: "recipe",
    timestamps: false,
    freezeTableName: true,
    underscored: true
  }
);

module.exports = Recipe;
