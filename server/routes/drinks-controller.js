const Drink = require("./../models/drink");

function drinkWithFav(drink, { favDrinks }) {
  return { ...drink.toObject(), isFav: favDrinks.includes(drink._id) };
}

async function getDrinks(req, res) {
  const { ingredient } = req.query;
  let dbResult;
  if (ingredient) {
    dbResult = await Drink.searchIngredient(ingredient);
  } else {
    dbResult = await Drink.find({ popular: true });
  }

  const { user } = req;
  const drinks = dbResult.map((dbDrink) => drinkWithFav(dbDrink, user));
  res.status(200).json({ drinks });
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
  return res.status(200).json({ drink: drinkWithFav(drink, user) });
}

function addFav(oldFavs, drinkId) {
  return oldFavs.includes(drinkId) ? oldFavs : [...oldFavs, drinkId];
}

function removeFav(oldFavs, drinkId) {
  return oldFavs.filter((id) => id !== drinkId);
}

module.exports = { getDrinks, getSingleDrink, addFavorite, removeFavorite };
