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
        .then((recipeData) => {
            const recipe = recipeData.map((post) => post.get({ plain: true }));
            res.render("homepage", {
                recipe,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // else login
    res.render("login");
});
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // else login
    res.render("signup");
});

router.get("/recipe/:id", (req, res) => {
    console.log(req.session, "recipe testing");
    Recipe.findOne({
        where: {
            id: req.params.id,
        },
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
        .then((recipeData) => {
            if (!recipeData) {
                res.status(404).json({ message: "No recipe found with this id" });
                return;
            }

            // serialize the data
            const recipe = recipeData.get({ plain: true });

            // pass data to template
            console.log(recipe);
            console.log(recipe.user.username);
            res.render("single-recipe", {
                recipe,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
