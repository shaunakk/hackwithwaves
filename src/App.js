import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Home from './components/Home'
import Login from './components/Login'
import Projects from './components/Projects'
import Transfer from './components/Transfer'


function App() {

  return (
    <Router>
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute exact path="/wallet" component={Home} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/transfer" component={Transfer} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
