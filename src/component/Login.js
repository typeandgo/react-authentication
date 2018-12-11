import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions/authActions';
import { AUTHENTICATED } from '../redux/constants';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
   
    const { username, password } = this.state;
    const formData =  {
      username,
      password
    };

    this.props.actionLogin(formData);
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const redirectToReferer = this.props.isAuth === AUTHENTICATED ? true : false;
    
    if (redirectToReferer === true) {
      return <Redirect to={from} />;
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Login</h1>          
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-md-center">
                <div className="col-md-4">
                  <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="username"
                        id="username"
                        value={this.state.username.value}
                        onChange={ this.onInputChange }
                        placeholder="Username" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input 
                        type="password" 
                        className="form-control"
                        name="password"
                        id="password"
                        value={this.state.password.value}
                        onChange={ this.onInputChange }
                        placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  isAuth: PropTypes.string.isRequired,
  actionLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { actionLogin })(Login);