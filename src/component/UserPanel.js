import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogout } from '../actions/authActions';
import { actionGetUser } from '../actions/userActions';
import { AUTHENTICATED } from '../actions/types';

class UserPanel extends Component {
  render() {

    const { isAuth, user } = this.props;


    console.log('user: ', Object.keys(user).length);
    console.log('user: ', user);
    console.log('isAuth: ', isAuth);

    if (isAuth === AUTHENTICATED && Object.keys(user).length === 0) {
      console.log('getUserInfo');
      this.props.actionGetUser();
    } else if (isAuth === AUTHENTICATED && Object.keys(user).length > 0) {

      return (
        <ul class="nav navbar-nav navbar-right">
          <li style={{ color: 'white', fontSize: '9px' }}>
              {`${user.firstName} ${user.lastName}`} <br/>
              {`Balance: ${user.balance}`} <br/>
              <a href="#" style={{ color: 'white' }} onClick={this.props.actionLogout}>Çıkış Yap</a>
            </li>
          </ul>
      )
    }

    return (<Link className="nav-link" to="/login" style={{ cursor: 'pointer', color: 'white' }}>Login</Link>)
  }
};

UserPanel.propTypes = {
  isAuth: PropTypes.string.isRequired,
  user: PropTypes.object,
  actionLogout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.user.userInfo
});

export default connect(mapStateToProps, { actionLogout, actionGetUser })(UserPanel);
