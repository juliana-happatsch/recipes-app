import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import handleClickFavoriteRecipe from '../helpers/handleClickFavoriteRecipe';
import handleClickClipboard from '../helpers/handleClickClipBoard';
import RecomendationCard from '../components/RecomendationCard';
import handleContinueButton from '../helpers/handleContinueButton';
import '../styles/favorite.css';
import '../styles/foodDetails.css';
import backIcon from '../images/bx-arrow-back.svg';

const FoodDetails = ({ match }) => {
  const { id } = match.params;
  const { data, request } = useFetch();
  const { data: drinksData, request: requestDrinks } = useFetch();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      const favoriteRecipesArray = JSON.parse(favoriteRecipes);
      if (favoriteRecipesArray.some((recipe) => recipe.id === id)) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  React.useEffect(() => {
    request(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, [request, id]);

  React.useEffect(() => {
    requestDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, [requestDrinks]);

  if (!data || !drinksData) {
    return null;
  }

  const { meals } = data;
  const meal = meals[0];
  const { strMealThumb, strYoutube, strMeal, strCategory, strInstructions } = meal;
  const urlVideo = strYoutube.replace('watch?v=', 'embed/');

  const entries = Object.entries(meal);
  const ingredients = entries.filter(([value]) => value
    .includes('strIngredient')).filter(([, value]) => value !== '' && value !== null);
  const ingredientsQuantity = entries.filter(([value]) => value
    .includes('strMeasure')).filter(([, value]) => value !== '' && value !== null);

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
        src={ strMealThumb }
        alt={ `${strMeal}` }
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
          <h1 data-testid="recipe-title" className="m-0">{ strMeal }</h1>
          <p data-testid="recipe-category" className="m-0 c-gray">{ `${strCategory}` }</p>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={ () => handleClickClipboard() }
            className="btn-icon"
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid="share-btn"
            />
          </button>
          <button
            type="button"
            onClick={ () => handleClickFavoriteRecipe(id, meal,
              setIsFavorite, isFavorite) }
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
        { ingredients.map(([, value], index) => (
          <li
            key={ value }
            data-testid={ `${index}-ingredient-name-and-measure` }
            className="fh-3"
          >
            { `${value} - ${ingredientsQuantity[index][1]}` }
          </li>
        ))}
      </ul>
      <span className="fh-4 ml-1">Instructions:</span>
      <p
        data-testid="instructions"
        className="bg-gray m-1 p-1 b-shadow b-radius fh-3"
      >
        { strInstructions }
      </p>
      <iframe
        data-testid="video"
        className="m-1 b-shadow"
        src={ urlVideo }
        title="description"
      />
      <span className="fh-4 ml-1">Recommended:</span>
      <RecomendationCard arrayOfRecomendations={ drinksData } />
      <div className="fixed">
        {
          buttonShoulBeVisible && (
            <Link to={ `/comidas/${id}/in-progress` }>
              <button
                className="start-btn"
                data-testid="start-recipe-btn"
                type="button"
              >
                { handleContinueButton(id, 'meals')
                  ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>)
        }
      </div>
    </div>
  );
};

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
