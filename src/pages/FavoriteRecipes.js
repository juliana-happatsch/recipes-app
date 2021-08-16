import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../styles/favorite.css';

const FavoriteRecipes = () => {
  document.title = 'Receitas Favoritas';
  const [recipes, setRecipes] = React.useState([]);
  const [filteredRecipes, setFilteredRecipes] = React.useState([]);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      setRecipes(JSON.parse(favoriteRecipes));
    }
  }, []);

  React.useEffect(() => {
    if (filter === 'all') {
      setFilteredRecipes(recipes);
    } else if (filter === 'comida') {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === 'comida'));
    } else if (filter === 'bebida') {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === 'bebida'));
    }
  }, [filter, recipes]);

  const url = window.location.href;
  const shareUrl = url.split('/receitas-favoritas')[0];

  function handleShareBtnClick(type, id) {
    if (type === 'comida') {
      navigator.clipboard.writeText(`${shareUrl}/comidas/${id}`);
    } else if (type === 'bebida') {
      navigator.clipboard.writeText(`${shareUrl}/bebidas/${id}`);
    }

    const popup = document.getElementById('myPopup');
    popup.classList.remove('hide');
    popup.classList.toggle('show');

    const ms = 2000;
    setTimeout(() => {
      popup.classList.toggle('hide');
      popup.classList.remove('show');
    }, ms);
  }

  function handleClickFavoriteRecipe(id) {
    const filteredRecipesById = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(filteredRecipesById);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipesById));
  }

  return (
    <>
      <Header />
      <div className="m-1 d-flex j-c-spAround">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
          className="btn-30 btn fh-2"
        >
          All
        </button>
        <button
          type="button"
          name="comida"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
          className="btn-30 btn fh-2"
        >
          Food
        </button>
        <button
          type="button"
          name="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
          className="btn-30 btn fh-2"
        >
          Drinks
        </button>
      </div>
      <div className="popup popup2">
        <p className="popuptext" id="myPopup">Link copiado!</p>
      </div>
      <div className="d-flex f-d-column a-i-center">
        { filteredRecipes.map((recipe, index) => {
          const { id, type, area, category, alcoholicOrNot, name, image } = recipe;
          return (
            <div key={ id } className="fav-card m-1 d-flex">
              <Link to={ `${type}s/${id}` } className="m-0 d-flex">
                <img
                  className="fav-card-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>

              <div
                className="d-flex f-d-column a-i-center j-c-center text-center p-1 m-auto"
              >
                { area && (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="m-25 fav-category"
                  >
                    {`${area} - ${category}`}
                  </p>) }
                { alcoholicOrNot
                && (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="m-25 fav-category"
                  >
                    {`${alcoholicOrNot} - ${category}`}
                  </p>) }

                <Link to={ `${type}s/${id}` } className="d-flex">
                  <h3 data-testid={ `${index}-horizontal-name` } className="m-25">
                    {name}
                  </h3>
                </Link>

                <div>
                  <button
                    src={ shareIcon }
                    type="button"
                    onClick={ () => handleShareBtnClick(type, id) }
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="btn-icon"
                  >
                    <img src={ shareIcon } alt="Share" className="fav-card-btn" />
                  </button>

                  <button
                    type="button"
                    onClick={ () => handleClickFavoriteRecipe(id) }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    className="btn-icon"
                  >
                    <img src={ blackHeartIcon } alt="Heart" className="fav-card-btn" />
                  </button>
                </div>
              </div>
            </div>
          );
        }) }
      </div>
    </>
  );
};

export default FavoriteRecipes;
