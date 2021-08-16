import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { fetchSearchBtnIngredients, clearData } from '../redux/actions/searchBarActions';
import '../styles/categoryBtn.css';

function RenderDrinksCategoriesBtn({ filterByIngredients, clearDrinkData }) {
  const [categoryBtn, setCategoryBtn] = useState(undefined);
  const [toggleDrinks, setToggleDrinks] = useState('');
  const { pathname } = useLocation();
  const { receiveData } = useSelector((state) => state.searchBarReducer);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      setCategoryBtn(json);
    };
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (toggleDrinks) {
      filterByIngredients(toggleDrinks, pathname);
    } else if (receiveData.length !== 0) {
      clearDrinkData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleDrinks]);

  const handleClick = ({ target }) => {
    if (target.value === toggleDrinks) {
      setToggleDrinks('');
    } else {
      setToggleDrinks(target.value);
    }
  };

  const handleRenderBtn = () => {
    const maxLength = 5;

    if (categoryBtn) {
      const renderBtn = categoryBtn.drinks.map((category, index) => {
        if (index < maxLength) {
          return (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              value={ category.strCategory }
              onClick={ (e) => handleClick(e) }
              className="btn-30 btn m-25 b-shadow"
            >
              { category.strCategory.split('/')[0].split(' ')[0] }
            </button>
          );
        }
        return null;
      });
      return renderBtn;
    }
  };
  return (
    <div className="d-flex f-wrap m-y-1 j-c-center a-i-center">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => clearDrinkData() }
        className="btn-30 btn m-25 b-shadow"
      >
        All
      </button>
      { handleRenderBtn() }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  filterByIngredients: (searchIngredient,
    pathname) => dispatch(fetchSearchBtnIngredients(searchIngredient, pathname)),
  clearDrinkData: () => dispatch(clearData()),
});

export default connect(null, mapDispatchToProps)(RenderDrinksCategoriesBtn);

RenderDrinksCategoriesBtn.propTypes = {
  filterByIngredients: PropTypes.func.isRequired,
  clearDrinkData: PropTypes.func.isRequired,
};
