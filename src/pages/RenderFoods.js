import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RenderFoods() {
  const [receiveFoodRecipes, setReceiveFoodRecipes] = useState(undefined);

  useEffect(() => {
    const fetchRenderMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      setReceiveFoodRecipes(json);
    };
    fetchRenderMeals();
  }, []);

  if (!receiveFoodRecipes) return <p>Carregando...</p>;
  const maxLength = 12;
  const filterRecipes = receiveFoodRecipes.meals
    .filter((_, index) => index < maxLength);
  return (
    filterRecipes.map((meal, index) => (
      <Link
        className="s-card m-25 m-y-1 d-flex f-d-column a-i-center text-center"
        to={ `/comidas/${meal.idMeal}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ meal.strMealThumb }
          alt={ meal.idMeal }
          data-testid={ `${index}-card-img` }
        />
        <h2
          className="h3"
          data-testid={ `${index}-card-name` }
        >
          { meal.strMeal }
        </h2>
      </Link>
    )));
}

export default RenderFoods;
