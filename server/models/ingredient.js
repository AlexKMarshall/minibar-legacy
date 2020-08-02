const mongoose = require("./../db");

const ingredientSchema = mongoose.Schema({
  externalId: {
    type: String,
  },
  name: { type: String, required: true },
  alcohol: { type: Boolean, default: true },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
