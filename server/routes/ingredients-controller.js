const Ingredient = require("../models/ingredient");

function ingredientWithSaved(ingredient, { savedIngredients }) {
  if (!savedIngredients) return { ...ingredient.toObject(), isSaved: false };

  return {
    ...ingredient.toObject(),
    isSaved: savedIngredients.includes(ingredient.name),
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
    ingredient.name,
    "add"
  );
  await user.save();

  return res
    .status(200)
    .json({ ingredient: ingredientWithSaved(ingredient, user) });
}

async function removeSaved(req, res) {
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
    ingredient.name,
    "remove"
  );
  await user.save();
  return res
    .status(200)
    .json({ ingredient: ingredientWithSaved(ingredient, user) });
}

function updateSavedList(oldSavedList, ingredientName, action) {
  if (action === "add") {
    return oldSavedList.includes(ingredientName)
      ? oldSavedList
      : [...oldSavedList, ingredientName];
  } else if (action === "remove") {
    return oldSavedList.filter((name) => name !== ingredientName);
  }
}

module.exports = {
  getIngredients,
  addSaved,
  removeSaved,
};
