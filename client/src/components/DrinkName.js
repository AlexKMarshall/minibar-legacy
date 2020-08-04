export default function DrinkName({ drink }) {
  const numTotalIngredients = drink.ingredients?.length;
  const numMatchedIngredients = drink.matchedIngredients?.length;
  const proportionMatched = numMatchedIngredients / numTotalIngredients;

  return `${drink.name} ${proportionMatched === 1 ? "*" : ""}`;
}
