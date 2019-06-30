import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Home from './components/Home'
import Admin from './components/Admin'
import Directory from './components/Directory'
import Login from './components/Login'
import Projects from './components/Projects'
import Transfer from './components/Transfer'
import Investments from './components/Investor'
import Give from './components/GiveAdvice'
import Get from './components/GetAdvice'


function App() {

  return (
    <Router>
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute exact path="/wallet" component={Home} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/projectsToInvest" component={Investments} />
      <PrivateRoute exact path="/transfer" component={Transfer} />
      <PrivateRoute exact path="/give" component={Give} />
      <PrivateRoute exact path="/get" component={Get} />
      <PrivateRoute exact path="/directory" component={Directory} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin" component={Admin} />

    </Router>
  );
}

export default App;
