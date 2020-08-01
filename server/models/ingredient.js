const mongoose = require("./../db");

const ingredientSchema = mongoose.Schema({
  externalId: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  alcohol: { type: Boolean, required: true },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
