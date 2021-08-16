import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import HeaderSearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

// colocar type depois de searchBar
function Header() {
  const [showSearchBar, toggleShowSearchBar] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  useEffect(() => {
    const urlArray = ['/explorar/comidas/area', '/comidas', '/bebidas'];
    if (urlArray.includes(pathname)) {
      setShowSearchIcon(true);
    } else {
      setShowSearchIcon(false);
    }
  }, [pathname]);

  const toggleSearchBar = () => {
    if (showSearchBar) {
      toggleShowSearchBar(false);
    } else {
      toggleShowSearchBar(true);
    }
  };

  const handleClickProfile = () => {
    history.push('/perfil');
  };

  return (
    <>
      <header className="m-Header d-flex j-c-spAround a-i-center b-shadow">
        <h1 data-testid="page-title" className="fh-4">{document.title}</h1>
        <div>
          <button
            src={ profileIcon }
            type="button"
            data-testid="profile-top-btn"
            onClick={ handleClickProfile }
            className="m-1 btn-icon "
          >
            <img src={ profileIcon } alt="icone do perfil" />
          </button>
          { showSearchIcon && (
            <button
              className="m-1 btn-icon"
              src={ searchIcon }
              type="button"
              data-testid="search-top-btn"
              id="search-btn"
              onClick={ toggleSearchBar }
            >
              <img src={ searchIcon } alt="icone de pesquisa" />
            </button>)}
        </div>
      </header>
      { showSearchBar && <HeaderSearchBar /> }
    </>
  );
}

export default Header;

Header.propTypes = {
  título: PropTypes.string,
  icone1: PropTypes.string,
  icone2: PropTypes.string,
}.isRequired;
