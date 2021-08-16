import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchSearchIngredients,
  fetchSearchName,
  fetchSearchFirstLetter } from '../redux/actions/searchBarActions';
import Input from './Input';

function HeaderSearchBar({ receiveData,
  searchByIngredients, searchByName, searchByFirstLetter }) {
  const [searchInput, setSearchInput] = useState('');
  const [radioValue, setRadioValue] = useState('Ingrediente');
  const [searchDataType, setSearchDataType] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const type = pathname === '/bebidas' ? 'drinks' : 'meals';
    setSearchDataType(type);
  }, [pathname]);

  const fetchSearchData = async () => {
    let fetchReceiveData;

    if (radioValue === 'Ingrediente') {
      fetchReceiveData = await searchByIngredients(searchInput, pathname);
    } else if (radioValue === 'Nome') {
      fetchReceiveData = await searchByName(searchInput, pathname);
    } else {
      fetchReceiveData = await searchByFirstLetter(searchInput, pathname);
    }
    if (fetchReceiveData) {
      setSearchDataType(fetchReceiveData[searchDataType]);
    }
  };

  if (receiveData.meals && receiveData.meals.length === 1) {
    history.push(`/comidas/${receiveData.meals[0].idMeal}`);
  }

  if (receiveData.drinks && receiveData.drinks.length === 1) {
    history.push(`/bebidas/${receiveData.drinks[0].idDrink}`);
  }

  if (receiveData.drinks === null || receiveData.meals === null) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div className="d-flex f-d-column p-1 searchBar">
      <Input
        id="searchInput"
        name="searchInput"
        placeHolder="Buscar receita"
        data-testid="search-input"
        value={ searchInput }
        setValue={ setSearchInput }
        className="p-1"
      />
      <div className="d-flex m-1">
        <div className="d-flex f-d-reverse">
          <Input
            id="ingredientInput"
            label="Ingrediente"
            name="radioInput"
            type="radio"
            data-testid="ingredient-search-radio"
            value="Ingrediente"
            setValue={ setRadioValue }
          />
        </div>
        <div className="d-flex f-d-reverse">
          <Input
            id="nameInput"
            label="Nome"
            name="radioInput"
            type="radio"
            data-testid="name-search-radio"
            value="Nome"
            setValue={ setRadioValue }
          />
        </div>
        <div className="d-flex f-d-reverse">
          <Input
            id="firstLetterInput"
            label="Primeira Letra"
            name="radioInput"
            type="radio"
            data-testid="first-letter-search-radio"
            value="Primeira Letra"
            setValue={ setRadioValue }
          />
        </div>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ fetchSearchData }
        className="btn"
      >
        Buscar
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  receiveData: state.searchBarReducer.receiveData,
});

const mapDispatchToProps = (dispatch) => ({
  searchByIngredients: (searchIngredient,
    pathname) => dispatch(fetchSearchIngredients(searchIngredient, pathname)),
  searchByName: (searchName,
    pathname) => dispatch(fetchSearchName(searchName, pathname)),
  searchByFirstLetter: (searchFirstLetter,
    pathname) => dispatch(fetchSearchFirstLetter(searchFirstLetter, pathname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchBar);

HeaderSearchBar.propTypes = {
  searchByIngredients: PropTypes.func.isRequired,
  searchByName: PropTypes.func.isRequired,
  searchByFirstLetter: PropTypes.func.isRequired,
  receiveData: PropTypes.arrayOf(PropTypes.array).isRequired,
};
