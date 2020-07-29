const mockDrinks = require("./../models/drink");

function getDrinks(req, res) {
  const drinks = mockDrinks.mockPopularDrinks();
  res.json({ drinks });
}

module.exports = { getDrinks };
