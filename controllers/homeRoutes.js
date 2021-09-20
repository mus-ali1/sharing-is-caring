const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Recipe, Comment } = require("../model");

router.get("/", (req, res) => {
    console.log("Its up and running!");
    console.log(req.session, "homepage render");
    Recipe.findAll({
        attributes: [
            "id",
            "recipe_name",
            "recipe_nationality",
            "upvote",
            "downvote"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "user_id", "recipe_id", "comment", "upvote", "downvote"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((recipesData) => {
            const recipes = recipesData.map((post) => post.get({ plain: true }));
            res.render("homepage", {
                recipes,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
