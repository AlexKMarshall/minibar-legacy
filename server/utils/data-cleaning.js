const Drink = require("../models/drink");
const Ingredient = require("../models/ingredient");

async function addMissingIngredients() {
  const drinks = await Drink.find({});

  for (const drink of drinks) {
    const ingredientNames = drink.ingredients.map(({ name }) => name);

    for (const name of ingredientNames) {
      if (!name) continue;

      const foundIngredient = await Ingredient.findOne({ name });
      if (!foundIngredient) {
        const newIngredient = new Ingredient({ name });
        await newIngredient.save();
        console.log("saved ", name);
      }
    }
  }
}

addMissingIngredients();
