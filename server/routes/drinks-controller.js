const mockDrinks = require("./../models/drink");

function getDrinks(req, res) {
  res.json(mockDrinks.drinks);
}

module.exports = { getDrinks };
