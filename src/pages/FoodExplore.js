import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

const FoodExplore = () => {
  document.title = 'Explorar Comidas';
  const [randomFood, setRandomFood] = useState(undefined);

  useEffect(() => {
    const fetchRandomFood = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await response.json();
      if (!randomFood) {
        const getMealId = json.meals.map((meal) => meal.idMeal);
        setRandomFood(getMealId);
      }
      return null;
    };
    fetchRandomFood();
  }, [randomFood]);

  return (
    <div className="body-b">
      <Header />
      <div className="b-explore d-flex f-d-column j-c-spAround m-3">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="btn fh-2"
        >
          <Link to="/explorar/comidas/ingredientes" className="c-white">
            Por Ingredientes
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          className="btn fh-2"
        >
          <Link to="/explorar/comidas/area" className="c-white">
            Por Local de Origem
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          className="btn fh-2"
        >
          <Link to={ `/comidas/${randomFood}` } className="c-white">
            Me Surpreenda!
          </Link>
        </button>
      </div>
      <FooterMenu />
    </div>
  );
};

export default FoodExplore;
