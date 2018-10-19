import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav';
import Home from './Page/Home';
// import About from './Page/About';
import Example from './Page/Example';
class App extends Component {
  render() {

    return (
      <div className="App">
        <HashRouter>
          <div className='home-container'>
            <Nav />
            <div className='home-container'>
              <h1>CFM Hackathon</h1>
            </div>
            <Switch>
              <Route exact path={`/`} component={Home} />
              {/* <Route exact path='/about' component={About} /> */}
              <Route exact path={`/example`} component={Example} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
