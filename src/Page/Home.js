import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
// var Link = require('react-router-dom').Link;

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container fluid>
            <p className="lead">Date: 5:30pm Nov. 16 to 10:00am Nov. 19</p>
            <p className="text-muted">Place: DC3336</p>
            <p className="text-muted">Submission deadline: 10am on Nov. 19</p>
            <p className="text-muted">Theme: Portfolio Analysis</p>
            <p className="text-muted">Food: Pizza will be provided</p>
            
            <p className="text-muted">Objectives: In this hackathon, we will develop a frontend application using ReactJS. A stock json file will be provided. The file consists of the one year TSX60 stocks data. Based on the data, pick 5 stocks to build a equally-weighted portfolio. The team with the highest portfolio return in a week wins.</p>
            <p className="text-muted">Rules:</p>
            <p className="text-muted">- Each student will clone the starter repository and create a new team branch from the repository.</p>
            <p className="text-muted">- To submit your code, you need to push your latest code to the team branch before the deadline.</p>
            <p className="text-muted">- If you commit new changes after the deadline, you will be disqualified from the awards.</p>
            <p className="text-muted">- Do not modify the data files or anything outside of your team folder!</p>
            <p className="text-muted">- Make sure all numbers are calculated from the data file. Do not hardcode numbers! We will catch you!</p>
            <p className="text-muted">- Project should at least include information regarding stock analysis, portfolio return, each group member's profile, and graphs/charts about the portfolio.</p>
            
            <p className="text-muted">Reminder: Start looking for your group (team of 4). Don't forget to bring your own laptop and charger</p>
            <p className="text-muted">Tutorials: Git, ReactJS</p>
            
            <p className="text-muted">Judges: CFM mentors, Yi, and Heather</p>
            <p className="text-muted">Awards: Best coding style, Best web design, Best portfolio</p>
            
          </Container>
        </Jumbotron>
      </div>
    )
  }
}
export default Home;
