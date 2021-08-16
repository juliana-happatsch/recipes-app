import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import '../styles/explore.css';

export default function Explore() {
  document.title = 'Explorar';
  return (
    <div className="body-b">
      <Header />
      <div className="b-explore d-flex f-d-column j-c-spAround m-3">
        <button className="btn fh-2" type="button">
          <Link to="/explorar/comidas" data-testid="explore-food" className="c-white">
            Explorar Comidas
          </Link>
        </button>
        <button className="btn fh-2" type="button">
          <Link to="/explorar/bebidas" data-testid="explore-drinks" className="c-white">
            Explorar Bebidas
          </Link>
        </button>
        <button className="btn fh-2" type="button">
          <Link to="/receitas-favoritas" className="c-white">
            Receitas Favoritas
          </Link>
        </button>
        <button className="btn fh-2" type="button">
          <Link to="/receitas-feitas" className="c-white">
            Receitas Feitas
          </Link>
        </button>
      </div>
      <FooterMenu />
    </div>
  );
}
