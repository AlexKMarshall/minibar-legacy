require("dotenv").config();
const fetch = require("node-fetch");
const Drink = require("./../models/drink");

const API_KEY = process.env.COCKTAIL_DB_KEY || 1;

console.log(API_KEY);

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
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

async function fetchAllCocktails() {
  const fetches = aToZ.map((letter) =>
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
      .then(({ drinks }) => (drinks ? drinks.map(drinkItemTransform) : null))
  );

  return Promise.all(fetches).then((values) => values.flat());
}

function fetchPopular() {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/popular.php`
  )
    .then((res) => res.json())
    .then(({ drinks }) => drinks);
}

function drinkItemTransform(cocktailDbDrink) {
  const {
    idDrink: id,
    strDrink: name,
    strInstructions,
    strDrinkThumb: image,
  } = cocktailDbDrink;
  return {
    externalId: id,
    image,
    name,
    method: strInstructions
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

async function populateDrinksDB() {
  await Drink.deleteMany();
  const allDrinks = await fetchAllCocktails().then((drinks) =>
    drinks.filter((drink) => drink && drink.externalId && drink.name)
  );
  await Drink.insertMany(allDrinks);
  const savedDrinks = await Drink.find({});
  console.log(savedDrinks);
}

fetchPopular();

async function populatePopular() {
  const popularDrinks = await fetchPopular();
  const ids = popularDrinks.map(({ idDrink }) => idDrink);
  for (const id of ids) {
    const drink = await Drink.findOne({ externalId: id });
    if (drink) {
      drink.popular = true;
      await drink.save();
    }
  }
}

populatePopular();

module.exports = { drinkItemTransform };
