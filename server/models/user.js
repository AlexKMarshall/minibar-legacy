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

module.exports = { addDrinkToFaves, removeDrinkFromFaves, getFavoriteDrinks };
