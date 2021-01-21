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
import Notes from './pages/Notes';

function App() {

  return (
       <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home}/> 
            <Route path="/login" component={Login}/> 
            <Route path="/signup" component={Signup}/> 
            <Route path="/note" component={Note}/> 
            <Route path="/notes" component={Notes}/>
          </Switch>
       </Router>
  );
}

export default App;
