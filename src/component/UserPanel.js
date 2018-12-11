import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAuth, actionLogout } from '../redux/actions/authActions';
import { actionGetUser } from '../redux/actions/userActions';
import { UNKNOWN, AUTHENTICATED } from '../redux/constants';

class UserPanel extends Component {
  render() {

    const { isAuth, user } = this.props;

    if (isAuth === UNKNOWN) {
      this.props.actionGetAuth();
    };

    let template = (<Link className="nav-link" to="/login">Login</Link>);

    if (isAuth === AUTHENTICATED && Object.keys(user).length === 0) {
      
      this.props.actionGetUser();

    } else if (isAuth === AUTHENTICATED && Object.keys(user).length > 0) {

      template = ( 
        <Fragment>
          <a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" style={{ fontSize: '12px' }} id="dropdownMenu2" aria-haspopup="true" aria-expanded="false">
            {`${user.firstName} ${user.lastName}`}
          </a>

          <div style={{ fontSize: '9px' }}>{`Balance: ${user.balance} TL`}</div>       
            
          <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <Link className="dropdown-item" to="/account"><i className="fas fa-user"></i> Account</Link>
            <Link className="dropdown-item" to="/settings"><i className="fas fa-cog"></i> Settings</Link>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" onClick={this.props.actionLogout}><i className="fas fa-power-off"></i> Logout</a>
          </ul>
        </Fragment>
      )
    }

    return (
      <ul className="ml-auto navbar-nav">
        <li className="nav-item dropdown user-panel">
          { template }
        </li>
      </ul>
    )
  }
};

UserPanel.propTypes = {
  isAuth: PropTypes.string.isRequired,
  user: PropTypes.object,
  actionLogout: PropTypes.func.isRequired,
  actionGetAuth: PropTypes.func.isRequired,
  actionGetUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.user.userInfo
});

export default connect(mapStateToProps, { actionGetAuth, actionLogout, actionGetUser })(UserPanel);
