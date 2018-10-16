import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
// var Link = require('react-router-dom').Link;

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container fluid>
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">Date: TBD</p>
            <p className="text-muted">Length: 3 days (Friday night to Monday morning)</p>
            <p className="text-muted">Theme: Team Consulting</p>
            <p className="text-muted">Participants: First year students</p>
            <p className="text-muted">Judges: CFM mentors, Yi, and Heather</p>
            <p className="text-muted">Submission: Online (github)</p>
            <p className="text-muted">Awards: Best coding style, Best web design, Best portfolio</p>
            <p className="text-muted">Reminder:</p>
            <p className="text-muted">To bring your own laptop</p>
            <p className="text-muted">We need extension cords</p>
            <p className="text-muted">Mission: To help the new first year CFMers learn and develop new skill</p>

            <p className="text-muted">Introduction Night</p>
            <p className="text-muted">Time: Friday night 6:00pm ~ 9:00pm</p>
            <p className="text-muted">Place: Room xxx</p>
            <p className="text-muted">Food: Provide pizza for dinner?</p>

            <p className="text-muted">We can have an introduction to this year’s CFM Hackathon (our first one). This will include the rules, submission deadline, awards, tutorials (Git, AngularJS), and support resources.</p>

            <p className="text-muted">Rules: In this hackathon, we will develop a client frontend application using AngularJS. Each student will clone the starter repository and create a new branch from the repository. To submit your code, you need to push your latest code to the branch before the deadline. If you commit new changes after the deadline, you will be disqualified from the awards.</p>
            <p className="text-muted">Submission deadline: 10am on Monday</p>
            <p className="text-muted">Tutorials: I will prepare slides for it and do a demo too</p>
            <p className="text-muted">Support: get support from all mentors</p>

            <p className="text-muted">Awards Night</p>
            <p className="text-muted">Time: TBD</p>
            <p className="text-muted">Place: TBD</p>

            <p className="text-muted">Give out awards to first year</p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}
export default Home;
