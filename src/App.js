import './css/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import PrivateRoute from './component/PrivateRoute';
import Dashboard from './component/Dashboard';
import Register from './component/Register';
import Login from './component/Login';
import NotFound from './component/NotFound';
import Header from './component/Ui/Header';
import ExampleProtectedRoute from './component/ExampleProtectedRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">          
            <Header />

            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/example" component={ExampleProtectedRoute} />
              <Route component={NotFound} />
            </Switch>    
          </div>
        </Router>
      </Provider>      
    );
  }
}

export default App;
