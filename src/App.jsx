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
import Notes from './pages/Notes';
import Logout from './pages/Logout';

function App() {

  return (
       <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home}/> 
            <Route path="/login" component={Login}/> 
            <Route path="/signup" component={Signup}/> 
            <Route path="/notes/:id" component={Notes}/>
            <Route path="/notes" component={Notes}/>
            <Route path="/logout" component={Logout}/>
          </Switch>
       </Router>
  );
}

export default App;
