import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import AddEntity from './components/add-entity';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-entity" component={AddEntity} />
      </Switch>
    </Router>
  );
};

export default App;