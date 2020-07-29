const express = require("express");
const drinksController = require("./drinks-controller");

const router = express.Router();

router.get("/drinks", drinksController.getDrinks);

module.exports = router;
