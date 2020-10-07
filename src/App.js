import React, { Component } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Header from './components/layout/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJwtToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from "./actions/securityActions";

const jwtToken = localStorage.jwtToken;

if(jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() /1000;
  if(decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route path="/" component={Homepage} />
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
