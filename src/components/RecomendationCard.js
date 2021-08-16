import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const RecomendationCard = ({ arrayOfRecomendations }) => {
  if (arrayOfRecomendations.meals) {
    const { meals } = arrayOfRecomendations;
    const numberOfMeals = 6;
    const filteredMeals = meals.filter((value, index) => index < numberOfMeals);
    return (
      <div className="div-scroll">
        { filteredMeals.map((meal, index) => {
          const { strMealThumb, strCategory, strMeal, idMeal } = meal;
          return (
            <Link
              key={ index }
              to={ `/comidas/${idMeal}` }
              className="recomendation-card d-flex f-d-column m-1 a-i-center"
            >
              <div
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ strMealThumb } alt={ strMeal } />
                <p>{ strCategory }</p>
                <h3
                  data-testid={ `${index}-recomendation-title` }
                  className="m-25"
                >
                  { strMeal }
                </h3>
              </div>
            </Link>
          );
        }) }
      </div>
    );
  }
  const { drinks } = arrayOfRecomendations;
  const numberOfDrinks = 6;
  const filteredDrinks = drinks.filter((value, index) => index < numberOfDrinks);
  return (
    <div className="div-scroll">
      { filteredDrinks.map((drink, index) => {
        const { strDrinkThumb, strCategory: strAlcoholic, strDrink, idDrink } = drink;
        return (
          <Link
            key={ index }
            to={ `/bebidas/${idDrink}` }
            className="recomendation-card d-flex f-d-column m-1 a-i-center"
          >
            <div
              data-testid={ `${index}-recomendation-card` }
            >
              <img src={ strDrinkThumb } alt={ strDrink } />
              <p>{ strAlcoholic }</p>
              <h3
                className="m-25"
                data-testid={ `${index}-recomendation-title` }
              >
                { strDrink }
              </h3>
            </div>
          </Link>
        );
      }) }
    </div>
  );
};

RecomendationCard.propTypes = {
  arrayOfRecomendations: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.shape({
      strMealThumb: PropTypes.string,
      strCategory: PropTypes.string,
      strMeal: PropTypes.string,
    })),
    drinks: PropTypes.arrayOf(PropTypes.shape({
      strDrinkThumb: PropTypes.string,
      strCategory: PropTypes.string,
      strDrink: PropTypes.string,
    })),
  }).isRequired,
};

export default RecomendationCard;
