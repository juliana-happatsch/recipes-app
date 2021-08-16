import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FoodList from './pages/FoodList';
import DrinkList from './pages/DrinkList';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import FoodExplore from './pages/FoodExplore';
import DrinkExplore from './pages/DrinkExplore';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoodByArea from './pages/ExploreFoodByArea';
import Profilepage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodList } />
      <Route exact path="/bebidas" component={ DrinkList } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <FoodDetails { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => <DrinkDetails { ...props } /> }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ (props) => <FoodInProgress { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ (props) => <DrinkInProgress { ...props } /> }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodByArea } />
      <Route path="/perfil" component={ Profilepage } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
