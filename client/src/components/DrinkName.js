export default function DrinkName({ drink }) {
  const numTotalIngredients = drink.ingredients?.length;
  const numMatchedIngredients = drink.matchedIngredients?.length;
  const proportionMatched =
    numTotalIngredients > 0 ? numMatchedIngredients / numMatchedIngredients : 0;

  return `${drink.name} ${proportionMatched === 1 ? "*" : ""}`;
}
