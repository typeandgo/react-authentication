import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div className="row">        
        <div className="col-md-12">
          <h1>Dashboard</h1>
          <div className="card">
            <div className="card-body">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/example">Protected Route Example</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default connect(null)(Dashboard);
