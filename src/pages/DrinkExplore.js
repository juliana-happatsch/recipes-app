import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

const DrinkExplore = () => {
  document.title = 'Explorar Bebidas';
  const [randomDrink, setRandomDrink] = useState(undefined);

  useEffect(() => {
    const fetchRandomDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const json = await response.json();
      if (!randomDrink) {
        const getDrinkId = json.drinks.map((drink) => drink.idDrink);
        setRandomDrink(getDrinkId);
      }
      return null;
    };
    fetchRandomDrink();
  }, [randomDrink]);

  return (
    <div className="body-b">
      <Header />
      <div className="b-explore d-flex f-d-column j-c-spAround m-3">
        <button
          className="btn fh-2"
          type="button"
          data-testid="explore-by-ingredient"
        >
          <Link to="/explorar/bebidas/ingredientes" className="c-white">
            Por Ingredientes
          </Link>
        </button>
        <button
          className="btn fh-2"
          type="button"
          data-testid="explore-surprise"
        >
          <Link to={ `/bebidas/${randomDrink}` } className="c-white">
            Me Surpreenda!
          </Link>
        </button>
      </div>
      <FooterMenu />
    </div>
  );
};
export default DrinkExplore;
