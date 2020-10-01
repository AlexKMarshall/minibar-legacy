const express = require("express");
const drinksController = require("./drinks-controller");
const ingredientsController = require("./ingredients-controller");
var jwt = require("express-jwt");
const jwks = require("jwks-rsa");

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

router.get(
  "/authorized",
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-g7dchufc.eu.auth0.com/.well-known/jwks.json",
    }),
    audience: "http://localhost:3001/api",
    issuer: "https://dev-g7dchufc.eu.auth0.com/",
    algorithms: ["RS256"],
  }),
  (req, res) => {
    res.status(200).json({ message: "successfully accessed hidden route" });
  }
);

module.exports = { router };
