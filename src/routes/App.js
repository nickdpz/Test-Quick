import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import Login from '../pages/Login';
import Register from '../pages/Register'
import { connect } from 'react-redux';

const App = (props) => {
  const { user } = props;
  const isLogged = (user.id);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={isLogged ? Home : Login} />
        <Route exact path="/post" component={isLogged ? CreatePost : Login} />
        <Route exact path="/category/:categoryId" component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps, null)(App);