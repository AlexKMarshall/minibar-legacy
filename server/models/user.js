const mongoose = require("./../db");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  favDrinks: {
    type: [String],
    default: [],
  },
  savedIngredients: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
