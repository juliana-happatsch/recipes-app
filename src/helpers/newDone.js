export default function newFavorite(obj, date) {
  const newObj = {};
  let tags = [];

  if (obj.strTags) {
    tags = obj.strTags.split(',');
  }

  if (obj.idMeal) {
    newObj.id = obj.idMeal;
    newObj.type = 'comida';
    newObj.area = obj.strArea;
    newObj.category = obj.strCategory;
    newObj.name = obj.strMeal;
    newObj.alcoholicOrNot = '';
    newObj.image = obj.strMealThumb;
    newObj.doneDate = date;
    newObj.tags = tags;
  } else {
    newObj.id = obj.idDrink;
    newObj.type = 'bebida';
    newObj.area = '';
    newObj.name = obj.strDrink;
    newObj.category = obj.strCategory;
    newObj.alcoholicOrNot = obj.strAlcoholic;
    newObj.image = obj.strDrinkThumb;
    newObj.doneDate = date;
    newObj.tags = tags;
  }
  return newObj;
}
