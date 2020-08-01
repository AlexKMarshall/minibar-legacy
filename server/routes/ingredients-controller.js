const Ingredient = require("../models/ingredient");

function ingredientWithSaved(ingredient, { favDrinks: savedIngredients }) {
  if (!savedIngredients) return { ...ingredient.toObject(), isFav: false };

  return {
    ...ingredient.toObject(),
    isFav: savedIngredients.includes(ingredient._id),
  };
}

async function getIngredients(req, res) {
  const dbResult = await Ingredient.find({});

  const { user } = req;
  const ingredients = dbResult.map((dbIngredient) =>
    ingredientWithSaved(dbIngredient, user)
  );
  res.status(200).json({ ingredients });
}

module.exports = {
  getIngredients,
};
