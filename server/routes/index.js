const express = require("express");
const drinksController = require("./drinks-controller");
const ingredientsController = require("./ingredients-controller");

const router = express.Router();

router.get("/drinks", drinksController.getDrinks);
router.get("/drinks/favorites", drinksController.getFavoriteDrinks);
router.get("/drinks/:id", drinksController.getSingleDrink);
router.post("/drinks/:drinkId/add_fav", drinksController.addFavorite);
router.post("/drinks/:drinkId/remove_fav", drinksController.removeFavorite);

router.get("/ingredients", ingredientsController.getIngredients);

module.exports = router;
