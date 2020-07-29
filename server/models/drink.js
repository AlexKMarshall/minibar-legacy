const mockDrinksExternalFormat = require("./../db/mock-db.json");
const { drinkItemTransform } = require("./../utils/scraping");

function mockPopularDrinks() {
  return mockDrinksExternalFormat.drinks.map(drinkItemTransform);
}

module.exports = { mockPopularDrinks };
