import newFavorite from './newFavorite';

export default function handleClickFavoriteRecipe(id, recipe, setIsFavorite, isFavorite) {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  if (favoriteRecipes) {
    let favoriteRecipesArray = JSON.parse(favoriteRecipes);
    if (favoriteRecipesArray.some((favoriteRecipe) => favoriteRecipe.id === id)) {
      favoriteRecipesArray = favoriteRecipesArray
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
    } else {
      favoriteRecipesArray.push(newFavorite(recipe));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
    setIsFavorite(!isFavorite);
  } else {
    const favoriteRecipesArray = [newFavorite(recipe)];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
    setIsFavorite(!isFavorite);
  }
}
