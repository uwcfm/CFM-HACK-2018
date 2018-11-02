import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Page/Home';
import Example from './Page/Example';
class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div className='container'>
            <Nav />
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route exact path={`/example`} component={Example} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
