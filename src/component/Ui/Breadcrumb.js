import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends Component {
  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Home</li>
        </ol>
      </nav>
    )
  }
}
