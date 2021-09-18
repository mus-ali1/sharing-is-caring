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


    await Comment.bulkCreate(commentSeeds, {
        individualHooks: true,
    });

    console.log("comments Added");


    await Recipe.bulkCreate(recipeSeeds, {
        individualHooks: true,
    });

    console.log("recipes Added");

    process.exit(0);
};

seedDatabase();
