import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Popular from './Popular';
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/battle" exact component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => (
              <p>Not found</p>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}