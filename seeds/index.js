const dbConnection = require("../config/connection");
const { Comment, Recipe, User } = require("../model");

const userSeeds = require("./user.json");
const commentSeeds = require("./comment.json");
const recipeSeeds = require("./recipe.json");

