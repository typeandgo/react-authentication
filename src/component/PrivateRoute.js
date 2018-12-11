import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UNKNOWN, AUTHENTICATED, UNAUTHENTICATED } from '../redux/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isAuth = rest.isAuth || UNKNOWN;

  return (
    <Route {...rest} render={(props) => {
      if (isAuth === UNKNOWN) {
        return (<div>Loading...</div>)
      } 

      if (isAuth === AUTHENTICATED) {
        return <Component {...props} />;
      }

      if (isAuth === UNAUTHENTICATED) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
    }} />
  );
}

PrivateRoute.propTypes = {
  isAuth: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);
