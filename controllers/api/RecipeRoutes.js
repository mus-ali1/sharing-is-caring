const router = require('express').Router();
const { Recipe } = require('../../model');
const authMiddleware = require('../../utils/auth');

router.post('/', authMiddleware, async (req, res) => {

  try {
    // console.log(...req.body);
    const data = {
      user_id: req.session.user_id,
      ingredients: req.body.ingredients,
      recipe_name: req.body.recipe_name,
      cooking_instructions: req.body.cooking_instructions
    }
    console.log("here");
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;