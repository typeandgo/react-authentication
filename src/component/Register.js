import React, { Component } from 'react'

export default class Register extends Component {

  constructor () {
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
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
                      <label htmlFor="email">E-mail</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="email"
                        id="email"
                        value={this.state.email.value}
                        onChange={ this.onInputChange }
                        placeholder="E-mail" />
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
