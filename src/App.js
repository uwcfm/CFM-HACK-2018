import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Page/Home';
import Example from './Page/Example';
import {Team1, Team2, Team3, Team4, Team5, Team6, Team7, Team8, Team9, Team10} from './Page/Submission';

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
              <Route exact path={`/submission/team-one`} component={Team1} />
              <Route exact path={`/submission/team-two`} component={Team2} />
              <Route exact path={`/submission/team-three`} component={Team3} />
              <Route exact path={`/submission/team-four`} component={Team4} />
              <Route exact path={`/submission/team-five`} component={Team5} />
              <Route exact path={`/submission/team-six`} component={Team6} />
              <Route exact path={`/submission/team-seven`} component={Team7} />
              <Route exact path={`/submission/team-eight`} component={Team8} />
              <Route exact path={`/submission/team-nine`} component={Team9} />
              <Route exact path={`/submission/team-ten`} component={Team10} />

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
