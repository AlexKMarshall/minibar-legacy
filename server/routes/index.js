const express = require("express");
const drinksController = require("./drinks-controller");

const router = express.Router();

router.get("/drinks", drinksController.getDrinks);
router.get("/drinks/:id", drinksController.getSingleDrink);

module.exports = router;
