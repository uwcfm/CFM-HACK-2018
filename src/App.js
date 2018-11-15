import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Page/Home';
import Example from './Page/Example';
import {Team1, Team2, Team3, Team4, Team5, Team6, Team7, Team8, Team9, Team10} from './Page/Submission';

class App extends Component {
  renderTeam({match}){
    // var arr=[1,2,3,3,4,5,6,7,8,9,10];
    var teamComponentArr = [Team1, Team2, Team3, Team4, Team5, Team6, Team7, Team8, Team9, Team10];
    const Team = teamComponentArr[match.params.id - 1];
    return <div>
        <Team />
      </div>
  }
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div className='container'>
            <Nav />
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route exact path={`/example`} component={Example} />
              <Route path={`/submission/team/:id`} component={this.renderTeam}/>

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
