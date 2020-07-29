const mockDrinks = require("./../models/drink");

function getDrinks(req, res) {
  const drinks = mockDrinks.mockPopularDrinks();
  res.status(200).send({ drinks });
}

module.exports = { getDrinks };
