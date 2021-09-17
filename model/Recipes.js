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
});
