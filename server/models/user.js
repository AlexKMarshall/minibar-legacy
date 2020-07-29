const mongoose = require("./../db");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  favDrinks: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model("User", userSchema);

const favDrinks = new Set();

function getFavoriteDrinks() {
  return favDrinks;
}

function addDrinkToFaves(drinkId) {
  favDrinks.add(drinkId);
}

function removeDrinkFromFaves(drinkId) {
  favDrinks.delete(drinkId);
}

module.exports = {
  userModel,
  addDrinkToFaves,
  removeDrinkFromFaves,
  getFavoriteDrinks,
};
