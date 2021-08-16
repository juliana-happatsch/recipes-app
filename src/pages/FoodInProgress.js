import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchAPI,
  addIngredient,
  deleteIngredient,
  updateArray } from '../redux/actions';
import RecipeInProgress from '../components/recipeInProgress';
import '../styles/recipesInProgress.css';

function FoodInProgress() {
  const [food, setFood] = useState();
  const dispatch = useDispatch();
  const meal = useSelector((state) => state.inProgressReducer.recipeReceived); // retorno api receita
  const ingredients = useSelector((state) => state.inProgressReducer.ingredients); // arary de ingredientes já checkados

  const { pathname } = useLocation();

  const beginning = 9;
  const end = 12;
  const id = pathname.slice(beginning, pathname.length - end);

  useEffect(() => {
    dispatch(fetchAPI('meal', id));
  }, [dispatch, id]);

  useEffect(() => {
    setFood(meal);
  }, [meal]);

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local) {
      const array = JSON.parse(local);
      if (array.meals[id]) {
        dispatch(updateArray(array.meals[id]));
      }
    }
  }, [id, dispatch]);

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local) {
      const array = JSON.parse(local);
      array.meals[id] = ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(array));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {
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
      parentNode.className = 'checkedIngredient';
      dispatch(addIngredient(ingName));
    } else {
      parentNode.className = '';
      dispatch(deleteIngredient(ingName));
    }
  };

  return (
    food && Object.keys(food).length > 0 ? <RecipeInProgress
      typeURL={ food }
      urlId={ id }
      ingQuant="20"
      checkIng={ checkIngredients }
      arrayCheckedIngredients={ ingredients }
    /> : null
  );
}

export default FoodInProgress;
