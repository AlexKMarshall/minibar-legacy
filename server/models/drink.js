const mockDrinksExternalFormat = require("./../db/mock-drinks-db.json");
const { drinkItemTransform } = require("./../utils/scraping");

function mockPopularDrinks() {
  return mockDrinksExternalFormat.drinks.map(drinkItemTransform);
}

function find() {
  return mockPopularDrinks();
}

function findById(id) {
  return mockPopularDrinks().find((drink) => drink._id === id);
}

module.exports = { find, findById };
