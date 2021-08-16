import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchAPI,
  addIngredient, deleteIngredient, updateArray } from '../redux/actions';
import RecipeInProgress from '../components/recipeInProgress';

function FoodInProgress() {
  const [drink, setDrink] = useState();
  const dispatch = useDispatch();
  const cocktail = useSelector((state) => state.inProgressReducer.recipeReceived);
  const ingredients = useSelector((state) => state.inProgressReducer.ingredients);

  const { pathname } = useLocation();
  const beginning = 9;
  const end = 12;
  const id = pathname.slice(beginning, pathname.length - end);

  useEffect(() => {
    dispatch(fetchAPI('cocktail', id));
  }, [dispatch, id]);

  useEffect(() => {
    setDrink(cocktail);
  }, [cocktail]);

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local) {
      const array = JSON.parse(local);
      if (array.cocktails[id]) {
        dispatch(updateArray(array.cocktails[id]));
      }
    }
  }, [id, dispatch]);

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local) {
      const array = JSON.parse(local);
      array.cocktails[id] = ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(array));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        cocktails: {
          [id]: ingredients,
        },
      }));
    }
  }, [ingredients, id]);

  const checkIngredients = (e) => {
    const { target } = e;
    const { parentNode, checked } = target;
    const ingName = Number(target.id);

    if (checked === true) {
      parentNode.style.textDecoration = 'line-through';
      dispatch(addIngredient(ingName));
    } else {
      parentNode.style.textDecoration = '';
      dispatch(deleteIngredient(ingName));
    }
  };

  return (
    drink && Object.keys(drink).length > 0 ? <RecipeInProgress
      typeURL={ drink }
      ingQuant="15"
      urlId={ id }
      checkIng={ checkIngredients }
      arrayCheckedIngredients={ ingredients }
    /> : null
  );
}

export default FoodInProgress;
