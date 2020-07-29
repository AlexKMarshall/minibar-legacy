const mockDrinks = require("./../models/drink");
const userModel = require("./../models/user");

function drinkWithFav(drink) {
  return { ...drink, isFav: userModel.getFavoriteDrinks().has(drink._id) };
}

function getDrinks(req, res) {
  const dbDrinks = mockDrinks.find();
  const drinks = dbDrinks.map((dbDrink) => drinkWithFav(dbDrink));
  res.status(200).json({ drinks });
}

function getSingleDrink(req, res) {
  const { id } = req.params;
  const dbDrink = mockDrinks.findById(id);
  const drink = drinkWithFav(dbDrink);
  res.status(200).json({ drink });
}

function addFavorite(req, res) {
  const { id } = req.params;
  userModel.addDrinkToFaves(id);
  res.status(200).json({ message: `Added id ${id} to faves` });
}

function removeFavorite(req, res) {
  const { id } = req.params;
  userModel.removeDrinkFromFaves(id);
  res.status(200).json({ message: `Removed id ${id} from faves` });
}

module.exports = { getDrinks, getSingleDrink, addFavorite, removeFavorite };
