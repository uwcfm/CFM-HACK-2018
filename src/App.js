import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Page/Home';
import Example from './Page/Example';
import Team1 from './Page/Submission/Team1';
import Team2 from './Page/Submission/Team2';
import Team3 from './Page/Submission/Team3';
import Team4 from './Page/Submission/Team4';
import Team5 from './Page/Submission/Team5';
import Team6 from './Page/Submission/Team6';
import Team7 from './Page/Submission/Team7';
import Team8 from './Page/Submission/Team8';
import Team9 from './Page/Submission/Team9';
import Team10 from './Page/Submission/Team10';
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
