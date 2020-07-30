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

drinkSchema.statics.searchIngredient = function (ingredientName) {
  return this.find({
    "ingredients.name": new RegExp(ingredientName.trim(), "i"),
  });
};

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
