const mongoose = require("./../db");

const drinkSchema = mongoose.Schema({
  externalId: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  image: "String",
  ingredients: [{ name: String, quantity: String }],
  method: [String],
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
});

const drinkModel = mongoose.model("Drink", drinkSchema);

// const mockDrinksExternalFormat = require("./../db/mock-drinks-db.json");
// const { drinkItemTransform } = require("./../utils/scraping");

// function mockPopularDrinks() {
//   return mockDrinksExternalFormat.drinks.map(drinkItemTransform);
// }

// function find() {
//   return mockPopularDrinks();
// }

// function findById(id) {
//   return mockPopularDrinks().find((drink) => drink._id === id);
// }

module.exports = drinkModel;
