import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions/authActions';
import { AUTHENTICATED } from '../redux/actions/types';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '' 
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formValidation = (e) => {
    e.preventDefault();

    const { username, password, errorMessage } = this.state;
    const formData =  {
      username,
      password
    };

    if (username.length < 8 || password.length < 6) {
      
      this.setState({  errorMessage: 'Formu kontrol edin.' });

    } else {

      this.setState({  errorMessage: '' });

      this.formSubmit(formData);
    }
  }

  formSubmit = (formData) => {
    this.props.actionLogin(formData);
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { user, auth } = this.props;
    const redirectToReferer = auth === AUTHENTICATED ? true : false;
    const { errorMessage } = this.state;
    let errorMessageTemplate = null;

    if (errorMessage.length > 0) {
      errorMessageTemplate = <div className="alert alert-danger" role="alert">Formu kontrol edin.</div>
    }

    if (user.status >= 400) {
      errorMessageTemplate = <div className="alert alert-danger" role="alert">{ user.message }</div>
    }

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
                  <form onSubmit={ this.formValidation }>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="username"
                        id="username"
                        ref={c => this.username = c }
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
                        ref={c => this.password = c }
                        id="password"
                        value={this.state.password.value}
                        onChange={ this.onInputChange }
                        placeholder="Password" />
                    </div>

                    { errorMessageTemplate }

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
  user: PropTypes.object.isRequired,
  auth: PropTypes.string.isRequired,
  actionLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  auth: state.user.auth
});

export default connect(mapStateToProps, { actionLogin })(Login);