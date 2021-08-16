import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RenderFoods from './RenderFoods';
import RenderMealsCategoryBtn from './RenderMealsCategoryBtn';
import '../styles/recipesCard.css';

const FoodList = () => {
  document.title = 'Comidas';
  const { receiveData } = useSelector((state) => state.searchBarReducer);

  if (!receiveData) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  const maxRender = 12;

  return (
    <div className="body-b">
      <Header />
      <RenderMealsCategoryBtn />
      <div className="d-flex f-wrap j-c-center">
        { receiveData.length < 1
          || !receiveData.meals ? <RenderFoods /> : receiveData.meals
            .filter((item, index) => index < maxRender)
            .map((meal, index) => (
              <Link
                to={ `/comidas/${meal.idMeal}` }
                className="s-card m-25 m-y-1 d-flex f-d-column a-i-center text-center"
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h2
                  className="h3"
                  data-testid={ `${index}-card-name` }
                >
                  { meal.strMeal }
                </h2>
              </Link>
            )) }
      </div>
      <FooterMenu />
    </div>
  );
};

export default FoodList;
