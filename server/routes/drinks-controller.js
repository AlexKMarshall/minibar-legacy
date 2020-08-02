const Drink = require("./../models/drink");

function drinkWithFav(drink, { favDrinks }) {
  if (!favDrinks) return { ...drink.toObject(), isFav: false };

  return { ...drink.toObject(), isFav: favDrinks.includes(drink._id) };
}

async function getDrinks(req, res) {
  const { q: searchTerm } = req.query;
  let dbResult;
  if (searchTerm) {
    dbResult = await Drink.searchNameOrIngredient(searchTerm);
  } else {
    dbResult = await Drink.find({ popular: true });
  }

  const { user } = req;
  const drinks = dbResult.map((dbDrink) => drinkWithFav(dbDrink, user));
  const sortedDrinks = sortByIngredients(drinks, user);
  res.status(200).json({ drinks: sortedDrinks });
}

async function getFavoriteDrinks(req, res) {
  const { user } = req;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const dbDrinks = await Drink.find({ _id: { $in: user.favDrinks } });
  const drinks = dbDrinks.map((dbDrink) => drinkWithFav(dbDrink, user));
  const sortedDrinks = sortByIngredients(drinks, user);
  res.status(200).json({ drinks: sortedDrinks });
}

async function getSingleDrink(req, res) {
  const { id } = req.params;
  const dbDrink = await Drink.findById(id);
  const { user } = req;
  const drink = drinkWithFav(dbDrink, user);
  res.status(200).json({ drink });
}

async function addFavorite(req, res) {
  const { drinkId } = req.params;
  const drink = await Drink.findById(drinkId);
  if (!drink) {
    return res.status(404).json({ message: `No drink with that id` });
  }

  const { user } = req;
  user.favDrinks = addFav(user.favDrinks, drinkId);
  await user.save();
  return res.status(200).json({ drink: drinkWithFav(drink, user) });
}

async function removeFavorite(req, res) {
  const { drinkId } = req.params;
  const drink = await Drink.findById(drinkId);
  if (!drink) {
    return res.status(404).json({ message: `No drink with that id` });
  }

  const { user } = req;
  user.favDrinks = removeFav(user.favDrinks, drinkId);
  await user.save();
  return res.status(200).json({ drink: drinkWithFav(drink, user) });
}

function addFav(oldFavs, drinkId) {
  return oldFavs.includes(drinkId) ? oldFavs : [...oldFavs, drinkId];
}

function removeFav(oldFavs, drinkId) {
  return oldFavs.filter((id) => id !== drinkId);
}

function sortByIngredients(drinks, { savedIngredients }) {
  const result = [];
  for (const drink of drinks) {
    const matchedIngredients = drink.ingredients
      .map((ingredient) => ingredient.name)
      .filter((name) => savedIngredients.includes(name));
    const updatedDrink = { ...drink, matchedIngredients };
    result.push(updatedDrink);
  }
  result.sort((a, b) => {
    const aMatchedPercent = a.matchedIngredients.length / a.ingredients.length;
    const bMatchedPercent = b.matchedIngredients.length / b.ingredients.length;
    return aMatchedPercent > bMatchedPercent ? -1 : 1;
  });
  return result;
}

module.exports = {
  getDrinks,
  getSingleDrink,
  addFavorite,
  removeFavorite,
  getFavoriteDrinks,
};
