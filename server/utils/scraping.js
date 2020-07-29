function drinkItemTransform(cocktailDbDrink) {
  const {
    idDrink: id,
    strDrink: name,
    strInstructions,
    strDrinkThumb: image,
  } = cocktailDbDrink;
  return {
    _id: id,
    externalId: id,
    image,
    name,
    instructions: strInstructions
      .split(".")
      .map((instruction) => instruction.trim()),
    ingredients: transformIngredients(cocktailDbDrink),
  };
}

function transformIngredients(cocktailDbDrink) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const name = cocktailDbDrink[`strIngredient${i}`];
    const quantity = cocktailDbDrink[`strMeasure${i}`];
    if (name !== null) {
      ingredients.push({ name, quantity });
    }
  }
  return ingredients;
}

module.exports = { drinkItemTransform };
