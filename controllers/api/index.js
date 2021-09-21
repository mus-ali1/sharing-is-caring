const router = require("express").Router();
const recipeRoutes = require("./RecipeRoutes");
const commentRoutes = require("./CommentRoutes");
const userRoutes = require("./UserRoutes");
const authMiddleware = require("../../utils/auth");

router.use("/recipe", authMiddleware, recipeRoutes);
router.use("/comment", authMiddleware, commentRoutes);
router.use("/user", userRoutes);

router.use("*", (req, res) => {
  console.log(req.originalUrl)
  res.status(404).end();
});

module.exports = router;
