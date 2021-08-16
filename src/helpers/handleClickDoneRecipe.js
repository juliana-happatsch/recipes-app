import newDone from './newDone';

export default function handleClickDoneRecipe(id, recipe, date) {
  const doneRecipes = localStorage.getItem('doneRecipes');
  if (doneRecipes) {
    let doneRecipesArray = JSON.parse(doneRecipes);
    if (doneRecipesArray.some((doneRecipe) => doneRecipe.id === id)) {
      doneRecipesArray = doneRecipesArray
        .filter((doneRecipe) => doneRecipe.id !== id);
    } else {
      doneRecipesArray.push(newDone(recipe, date));
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
  } else {
    const doneRecipesArray = [newDone(recipe, date)];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
  }
}
