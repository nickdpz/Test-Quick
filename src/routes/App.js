import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import Login from '../pages/Login';
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import { connect } from 'react-redux';
import Layout from '../components/Layout';

const App = (props) => {
  const { user } = props;
  const isLogged = (user.id);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={isLogged ? Home : Login} />
          <Route exact path="/new_post" component={isLogged ? CreatePost : Login} />
          <Route exact path="/category/:categoryId" component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={isLogged ? Profile : Login} />
          <Route exact path="/post/:productId" component={ProductDetails} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps, null)(App);