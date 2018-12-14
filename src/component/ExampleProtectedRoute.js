import React, { Component } from 'react'

export default class ExampleProtectedRoute extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Private Route Example</h1>          
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-md-center">
                <div className="col-md-12">
                  <h2>Pricate Page (Private Route)</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
