import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>404</h1>          
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-md-center">
                <div className="col-md-12">
                  <h2>Page Not Found!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
