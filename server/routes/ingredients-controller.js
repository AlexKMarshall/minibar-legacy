const Ingredient = require("../models/ingredient");

function ingredientWithSaved(ingredient, { savedIngredients }) {
  if (!savedIngredients) return { ...ingredient.toObject(), isSaved: false };

  return {
    ...ingredient.toObject(),
    isSaved: savedIngredients.includes(ingredient._id),
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

async function addSaved(req, res) {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findById(ingredientId);
  if (!ingredient) {
    return res
      .status(404)
      .json({ message: `No ingredient with id ${ingredientId}` });
  }

  const { user } = req;
  user.savedIngredients = updateSavedList(
    user.savedIngredients,
    ingredientId,
    "add"
  );
  await user.save();
  console.log(user.toObject());
  return res
    .status(200)
    .json({ ingredient: ingredientWithSaved(ingredient, user) });
}

function updateSavedList(oldSavedList, ingredientId, action) {
  if (action === "add") {
    return oldSavedList.includes(ingredientId)
      ? oldSavedList
      : [...oldSavedList, ingredientId];
  }
}

module.exports = {
  getIngredients,
  addSaved,
};
