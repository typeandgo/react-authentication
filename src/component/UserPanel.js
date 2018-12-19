import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogout, actionGetUser, actionTest } from '../redux/actions/authActions';
import { AUTHENTICATED } from '../redux/actions/types';

class UserPanel extends Component {

  componentDidMount () {
    this.props.actionGetUser();
  }

  render() {

    const { user, auth, actionTest } = this.props;
    const pathName = this.props.location.pathname;
    let template = pathName === '/login' ? null : 
    
    (
      <Fragment>
        <Link className="nav-link" to="/login">Login</Link>
        <button onClick={ actionTest }>Test without Auth</button>
      </Fragment>
    );

    if (auth === AUTHENTICATED) {

      template = ( 
        <Fragment>
          <a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" style={{ fontSize: '12px' }} id="dropdownMenu2" aria-haspopup="true" aria-expanded="false">
            {`${user.fullName}`}
          </a>

          <div style={{ fontSize: '9px' }}>{`Balance: ${user.balance} TL`}</div>       
            
          <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <Link className="dropdown-item" to="/account"><i className="fas fa-user"></i> Account</Link>
            <Link className="dropdown-item" to="/settings"><i className="fas fa-cog"></i> Settings</Link>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" onClick={this.props.actionLogout}><i className="fas fa-power-off"></i> Logout</a>
          </ul>

          <button onClick={ this.props.actionTest }>Test with Auth</button>
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
  user: PropTypes.object.isRequired,
  auth: PropTypes.string.isRequired,
  actionLogout: PropTypes.func.isRequired,
  actionTest: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  auth: state.user.auth
});

export default withRouter(connect(mapStateToProps, { actionLogout, actionGetUser, actionTest })(UserPanel));
