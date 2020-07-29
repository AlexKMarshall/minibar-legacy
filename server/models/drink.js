const mockDrinksExternalFormat = require("./../db/mock-db.json");
const { drinkItemTransform } = require("./../utils/scraping");

function mockPopularDrinks() {
  return mockDrinksExternalFormat.drinks.map(drinkItemTransform);
}

const drinkShape = {
  _id: "11000abc124",
  coktailDBId: "11000",
  name: "Mojito",
  instructions: [
    "Muddle mint leaves with sugar and lime juice",
    "Add a splash of soda water and fill the glass with cracked ice",
    "Pour the rum and top with soda water",
    "Garnish and serve with straw",
  ],
  image:
    "https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg",
  ingredients: [
    { name: "Light rum", quantity: "2-3 oz" }, //trim all fields
    { name: "Lime", quantity: "Juice of 1" },
    { name: "Sugar", quantity: "2 tsp" },
    { name: "Mint", quantity: "2-4" },
    { name: "Soda water", quantity: null },
  ],
};

module.exports = { mockPopularDrinks };
