export default function newFavorite(obj) {
  const newObj = {};
  if (obj.idMeal) {
    newObj.id = obj.idMeal;
    newObj.type = 'comida';
    newObj.area = obj.strArea;
    newObj.category = obj.strCategory;
    newObj.name = obj.strMeal;
    newObj.alcoholicOrNot = '';
    newObj.image = obj.strMealThumb;
  } else {
    newObj.id = obj.idDrink;
    newObj.type = 'bebida';
    newObj.area = '';
    newObj.name = obj.strDrink;
    newObj.category = obj.strCategory;
    newObj.alcoholicOrNot = obj.strAlcoholic;
    newObj.image = obj.strDrinkThumb;
  }
  return newObj;
}
