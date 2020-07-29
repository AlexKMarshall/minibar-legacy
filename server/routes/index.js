const express = require("express");
const drinksController = require("./drinks-controller");

const router = express.Router();

router.get("/drinks", drinksController.getDrinks);
router.get("/drinks/:id", drinksController.getSingleDrink);
router.post("/drinks/:drinkId/add_fav", drinksController.addFavorite);
router.post("/drinks/:drinkId/remove_fav", drinksController.removeFavorite);

module.exports = router;
