const mockDrinks = require("./../models/drink");
const { userModel } = require("./../models/user");

const MOCK_USERNAME = "alex";

async function getUser() {
  const existingUser = await userModel.findOne({ username: MOCK_USERNAME });
  if (existingUser) {
    return existingUser;
  } else {
    const user = new userModel({ username: MOCK_USERNAME });
    await user.save();
    return user;
  }
}

function drinkWithFav(drink, { favDrinks }) {
  return { ...drink, isFav: favDrinks.includes(drink._id) };
}

async function getDrinks(req, res) {
  const dbDrinks = mockDrinks.find();
  const user = await getUser();
  const drinks = dbDrinks.map((dbDrink) => drinkWithFav(dbDrink, user));
  res.status(200).json({ drinks });
}

async function getSingleDrink(req, res) {
  const { id } = req.params;
  const dbDrink = mockDrinks.findById(id);
  const user = await getUser();
  const drink = drinkWithFav(dbDrink, user);
  res.status(200).json({ drink });
}

async function addFavorite(req, res) {
  const { drinkId } = req.params;
  const drink = mockDrinks.findById(drinkId);
  if (!drink) {
    return res.status(404).json({ message: `No drink with that id` });
  }

  const user = await getUser();
  const oldFavDrinks = user.favDrinks;
  if (!oldFavDrinks.includes(drinkId)) {
    user.favDrinks = [...oldFavDrinks, drinkId];
    await user.save();
  }
  return res.status(200).json({ drink: drinkWithFav(drink, user) });
}

async function removeFavorite(req, res) {
  const { drinkId } = req.params;
  const drink = mockDrinks.findById(drinkId);
  if (!drink) {
    return res.status(404).json({ message: `No drink with that id` });
  }

  const user = await getUser();
  const oldFavDrinks = user.favDrinks;
  if (oldFavDrinks.includes(drinkId)) {
    user.favDrinks = oldFavDrinks.filter((id) => id !== drinkId);
    await user.save();
  }
  return res.status(200).json({ drink: drinkWithFav(drink, user) });
}

module.exports = { getDrinks, getSingleDrink, addFavorite, removeFavorite };
