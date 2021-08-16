import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RenderDrinks from './RenderDrinks';
import RenderDrinksCategoriesBtn from './RenderDrinksCategoriesBtn';

const DrinkList = ({ receiveData, isFetching }) => {
  document.title = 'Bebidas';

  const renderFilteredReceiveDataDrinks = () => {
    const maxRender = 12;
    if (!receiveData) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (receiveData.drinks && !isFetching && receiveData.drinks !== null) {
      const filteredData = receiveData.drinks.filter((item, index) => index < maxRender);
      return (
        filteredData
          .map((drink, index) => (
            <Link
              to={ `/bebidas/${drink.idDrink}` }
              key={ index }
              className="s-card m-25 m-y-1 d-flex f-d-column a-i-center text-center"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h2
                data-testid={ `${index}-card-name` }
                className="h3"
              >
                { drink.strDrink }
              </h2>
            </Link>
          ))
      );
    }
  };

  return (
    <div className="body-b">
      <Header />
      <RenderDrinksCategoriesBtn />
      { receiveData ? (
        <div className="d-flex f-wrap j-c-center">
          { receiveData.length < 1 || !receiveData.drinks ? <RenderDrinks />
            : renderFilteredReceiveDataDrinks() }
        </div>
      ) : 'Erro' }
      <FooterMenu />
    </div>
  );
};

DrinkList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  receiveData: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  receiveData: state.searchBarReducer.receiveData,
  isFetching: state.searchBarReducer.isFetching,
});

export default connect(mapStateToProps)(DrinkList);

DrinkList.defaultProps = {
  drinks: {},
};

DrinkList.propTypes = {
  receiveData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  drinks: PropTypes.objectOf(PropTypes.string),
};
