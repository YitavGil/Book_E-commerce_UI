import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import Books from './books/Books';
import BookDetails from './bookdetail/BookDetails';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Profile from './profile/Profile';
import NotFound from './utils/notfound/NotFound';
import { GlobalState } from '../../GlobalState';
import Genres from './genres/Genres';
import CreateProduct from './createProduct/CreateProduct';

const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  return (
    <Switch>
      <Route path='/' exact component={Books} />
      <Route path='/detail/:id' exact component={BookDetails} />
      <Route path='/login' exact component={isLogged ? NotFound : Login} />
      <Route path='/register' exact component={isLogged ? NotFound : Register} />
      <Route path='/create_product' exact component={isLogged ? CreateProduct : NotFound } />
      <Route path='/edit_product/:id' exact component={isAdmin ? CreateProduct : NotFound } />
      <Route path='/cart' exact component={Cart} />
      <Route path='/Profile' exact component={Profile} />
      <Route path='/genres' exact component={isAdmin ? Genres : NotFound} />

      <Route path='*' exact component={NotFound} />
    </Switch>
  )
};

export default Pages;
