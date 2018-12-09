import React, { Component } from 'react'

export default class ExampleProtectedRoute extends Component {
  render() {
    return (
      <div className="row">        
        <div className="col-md-12">
          <h1>Protected Route Example</h1>

          <div className="card">
            <div className="card-body">
                Protected page content...
            </div>
          </div>
        </div>
      </div>
    )
  }
}
