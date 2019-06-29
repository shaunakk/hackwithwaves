import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Home from './components/Home'
import Login from './components/Login'


function App() {

  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
