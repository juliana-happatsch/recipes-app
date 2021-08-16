import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RenderDrinks() {
  const [receiveDrinksRecipes, setReceiveDrinksRecipes] = useState(undefined);

  useEffect(() => {
    const fetchRenderDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      setReceiveDrinksRecipes(json);
    };
    fetchRenderDrinks();
  }, []);

  if (!receiveDrinksRecipes) return <p>Carregando...</p>;
  const maxLength = 12;
  const filterRecipes = receiveDrinksRecipes.drinks
    .filter((item, index) => index < maxLength);
  return (
    filterRecipes.map((drink, index) => (
      <Link
        key={ index }
        to={ `/bebidas/${drink.idDrink}` }
        className="s-card m-25 m-y-1 d-flex f-d-column a-i-center text-center"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.idDrink }
          data-testid={ `${index}-card-img` }
        />
        <h2
          className="h3"
          data-testid={ `${index}-card-name` }
        >
          { drink.strDrink }
        </h2>
      </Link>
    ))
  );
}

export default RenderDrinks;
