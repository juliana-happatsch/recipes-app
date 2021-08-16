import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

const DoneRecipes = () => {
  document.title = 'Receitas Feitas';
  const [recipes, setRecipes] = React.useState([]);
  const [filteredRecipes, setFilteredRecipe] = React.useState([]);

  React.useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      setRecipes(JSON.parse(doneRecipes));
      setFilteredRecipe(JSON.parse(doneRecipes));
    }
  }, []);

  function handleClickBtnFilters({ target: { value } }) {
    if (value === 'comida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'comida'));
    } else if (value === 'bebida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'bebida'));
    } else {
      setFilteredRecipe(recipes);
    }
  }

  function handleClick(type, id) {
    const url = window.location.href.split('/receitas-feitas')[0];
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);

    const popup = document.getElementById('myPopup');
    popup.classList.remove('hide');
    popup.classList.toggle('show');

    const time = 3000;
    setTimeout(() => {
      popup.classList.toggle('hide');
      popup.classList.remove('show');
    }, time);
  }

  return (
    <div>
      <Header />
      <div className="d-flex j-c-center m-1">
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ handleClickBtnFilters }
          className="btn-30 btn m-25"
        >
          All
        </button>
        <button
          type="button"
          value="comida"
          data-testid="filter-by-food-btn"
          onClick={ handleClickBtnFilters }
          className="btn-30 btn m-25"
        >
          Food
        </button>
        <button
          type="button"
          value="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickBtnFilters }
          className="btn-30 btn m-25"
        >
          Drinks
        </button>
      </div>
      <div className="popup popup2">
        <p className="popuptext" id="myPopup">Link copiado!</p>
      </div>
      <div className="d-flex f-d-column a-i-center">
        {filteredRecipes.map((recipe, index) => {
          const {
            image,
            type,
            id,
            category,
            name,
            area,
            alcoholicOrNot,
            doneDate,
            tags } = recipe;
          return (
            <div
              key={ id }
              className="recipe-card m-1 d-flex b-shadow"
            >
              <Link to={ `/${type}s/${id}` } className="m-0 d-flex">
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  className="m-0"
                />
              </Link>
              <div className="w-100 d-flex f-d-column ml-1">
                <div className="d-flex p-1 j-c-spBetween">
                  {area ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="c-secondary m-y-25 fs-px-14"
                    >
                      { `${area} - ${category}` }
                    </p>
                  ) : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="c-secondary m-y-25 fs-px-14"
                    >
                      { alcoholicOrNot }
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={ () => handleClick(type, id) }
                    className="btn-icon ml-1 p-0"
                  >
                    <img
                      src={ shareIcon }
                      alt=""
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                </div>
                <Link to={ `/${type}s/${id}` }>
                  <h3
                    className="m-25"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="m-25 c-gray fs-px-14"
                >
                  {`${doneDate}`}
                </p>
                <div className="d-flex f-wrap">
                  {tags.length > 0 && tags.map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      className="tag"
                    >
                      { tag }
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoneRecipes;
