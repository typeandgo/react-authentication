import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    
    rest.isAuth === 'AUTHENTICATED' 
    ? <Component {...props}/> 
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />

  )} />
);

PrivateRoute.propTypes = {
  isAuth: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);
