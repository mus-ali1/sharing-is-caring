const dbConnection = require("../config/connection");
const { Comment, Recipe, User } = require("../model");

const userSeeds = require("./user.json");
const commentSeeds = require("./comment.json");
const recipeSeeds = require("./recipe.json");

const seedDatabase = async () => {
    await dbConnection.sync({ force: true });

    console.log("DB Flashed");

    await User.bulkCreate(userSeeds, {
        individualHooks: true,
    });

    console.log("Users Added");
