const router = require("express").Router();
const recipeRoutes = require("./RecipeRoutes");
const commentRoutes = require("./CommentRoutes");
const userRoutes = require("./UserRoutes");

//router.use("/recipe", recipeRoutes);
//router.use("/comment", commentRoutes);
router.use("/user", userRoutes);

router.use("*", (req, res) => {
  res.status(404).end();
});

module.exports = router;
