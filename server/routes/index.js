const express = require("express");
const drinksController = require("./drinks-controller");
const ingredientsController = require("./ingredients-controller");

const router = express.Router();

router.get("/drinks", drinksController.getDrinks);
router.get("/drinks/favorites", drinksController.getFavoriteDrinks);
router.get("/drinks/random", drinksController.getRandomDrinks);
router.get("/drinks/:id", drinksController.getSingleDrink);
router.post("/drinks/:drinkId/add_fav", drinksController.addFavorite);
router.post("/drinks/:drinkId/remove_fav", drinksController.removeFavorite);

router.get("/ingredients", ingredientsController.getIngredients);
router.post(
  "/ingredients/:ingredientId/add_saved",
  ingredientsController.addSaved
);
router.post(
  "/ingredients/:ingredientId/remove_saved",
  ingredientsController.removeSaved
);

module.exports = router;
