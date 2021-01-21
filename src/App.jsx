import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Note from './pages/Note';

function App() {

  return (
       <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home}/> 
            <Route path="/login" component={Login}/> 
            <Route path="/signup" component={Signup}/> 
            <Route path="/note" component={Note}/> 
          </Switch>
       </Router>
  );
}

export default App;
