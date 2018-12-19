import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UNAUTHENTICATED, UNKNOWN } from '../redux/actions/types';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { user, auth } = rest;

  return (
    <Route {...rest} render={(props) => {
      if (auth === UNKNOWN) {

        return <div>Loading...</div>;

      } else if (auth === UNAUTHENTICATED) {

        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;

      } else {

        return <Component {...props} />;
      }
    }} />
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  auth: state.user.auth
});

export default connect(mapStateToProps)(PrivateRoute);
