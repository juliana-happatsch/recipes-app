export default function handleContinueButton(id, category) {
  const recipesInProgress = localStorage.getItem('inProgressRecipes');
  let continueButton = false;
  if (recipesInProgress) {
    const recipesInProgressObj = JSON.parse(recipesInProgress)[category];
    if (recipesInProgressObj[id]) {
      continueButton = true;
    }
  }
  return continueButton;
}
