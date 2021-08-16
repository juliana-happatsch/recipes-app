import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import handleClickFavoriteRecipe from '../helpers/handleClickFavoriteRecipe';
import handleClickClipboard from '../helpers/handleClickClipBoard';
import RecomendationCard from '../components/RecomendationCard';
import handleContinueButton from '../helpers/handleContinueButton';
import '../styles/details.css';
import backIcon from '../images/bx-arrow-back.svg';

const DrinkDetails = ({ match }) => {
  const { id } = match.params;
  const { data: mealsData, request: requestMeals } = useFetch();
  const { data, request } = useFetch();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.some((recipe) => recipe.id === id)) {
      setIsFavorite(true);
    }
  }, [id]);

  React.useEffect(() => {
    request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, [request, id]);

  React.useEffect(() => {
    requestMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, [requestMeals]);

  if (!data || !mealsData || !data.drinks) {
    return null;
  }

  const { drinks } = data;
  const drink = drinks[0];
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drink;
  const entries = Object.entries(drink);
  const ingredients = entries.filter(([value]) => value
    .includes('strIngredient')).filter(([, value]) => value !== '' && value !== null);

  const doneRecipes = localStorage.getItem('doneRecipes');
  let buttonShoulBeVisible = true;
  if (doneRecipes) {
    const doneRecipesArray = JSON.parse(doneRecipes);
    buttonShoulBeVisible = !doneRecipesArray.some((recipe) => recipe.id.includes(id));
  }

  const handleClickBackIcon = () => {
    history.goBack();
  };

  return (
    <div className="body-b d-flex f-d-column">
      <img
        className="top-img"
        src={ strDrinkThumb }
        alt={ `${strDrink}` }
        data-testid="recipe-photo"
      />
      <button
        onClick={ handleClickBackIcon }
        className="btn-icon float-icon"
        type="button"
      >
        <img src={ backIcon } alt="back" className="back-icon" />
      </button>
      <div className="popup">
        <p className="popuptext" id="myPopup">Link copiado!</p>
      </div>
      <div className="d-flex a-i-center j-c-spBetween b-shadow p-1 bg-title">
        <div>
          <h1 data-testid="recipe-title" className="m-0">{ strDrink }</h1>
          <p data-testid="recipe-category" className="m-0 c-gray">{ strAlcoholic }</p>
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn-icon"
            onClick={ () => handleClickClipboard() }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid="share-btn"
            />
          </button>
          <button
            type="button"
            onClick={ () => {
              handleClickFavoriteRecipe(id, drink, setIsFavorite, isFavorite);
            } }
            className="btn-icon"
          >
            { isFavorite ? (
              <img src={ blackHeartIcon } alt="" data-testid="favorite-btn" />)
              : (<img src={ whiteHeartIcon } alt="" data-testid="favorite-btn" />) }
          </button>
        </div>
      </div>
      <span className="fh-4 m-1">
        Ingredients:
      </span>
      <ul className="bg-gray p-y-1 m-1 b-shadow b-radius">
        { ingredients.map(([name, value], index) => {
          const quantity = drink[`strMeasure${name.split('strIngredient')[1]}`];
          if (quantity === null || quantity === '') {
            return (
              <li
                key={ value }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="fh-3"
              >
                { value }
              </li>
            );
          }
          return (
            <li
              key={ value }
              data-testid={ `${index}-ingredient-name-and-measure` }
              className="fh-3"
            >
              { `${value} - ${drink[`strMeasure${name.split('strIngredient')[1]}`]}` }
            </li>
          );
        })}
      </ul>
      <span className="fh-4 ml-1">Instructions:</span>
      <p
        data-testid="instructions"
        className="bg-gray m-1 p-1 b-shadow b-radius fh-3"
      >
        { strInstructions }
      </p>
      <span className="fh-4 ml-1">Recommended:</span>
      <RecomendationCard arrayOfRecomendations={ mealsData } />
      {
        buttonShoulBeVisible && (
          <Link to={ `/bebidas/${id}/in-progress` }>
            <button
              className="start-btn"
              data-testid="start-recipe-btn"
              type="button"
            >
              { handleContinueButton(id, 'cocktails')
                ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>
          </Link>)
      }
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
