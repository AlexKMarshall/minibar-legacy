const fetch = require("node-fetch");

const aToZ = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function fetchData() {
  const fetches = aToZ.map((letter) =>
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
      .then(({ drinks }) => (drinks ? drinks.map(drinkItemTransform) : null))
  );

  return Promise.all(fetches).then(console.log);
}

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
      .map((instruction) => instruction.trim())
      .filter(Boolean),
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

fetchData();

module.exports = { drinkItemTransform };
