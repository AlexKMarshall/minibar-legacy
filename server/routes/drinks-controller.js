const mockDrinks = require("./../models/drink");

function getDrinks(req, res) {
  const drinks = mockDrinks.find();
  res.status(200).json({ drinks });
}

function getSingleDrink(req, res) {
  const { id } = req.params;
  const drink = mockDrinks.findById(id);
  res.status(200).json({ drink });
}

module.exports = { getDrinks, getSingleDrink };
