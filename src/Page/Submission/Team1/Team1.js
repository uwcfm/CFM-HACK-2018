// Sherman Grewal
// Oliver Lingertat
// Luncy Cheng
// Navya Mehta

import React, { Component } from 'react';
import StockStats from '../../../Data/stocks';
import Alg from './Algorithm'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Jumbotron } from 'reactstrap';

class Team1 extends Component {
  constructor(props) {
    super(props);
      this.state = {Alg.state.fullray};
  }
  render() {
    return (
      <div className='container'>Team 1 hello world</div>
    )
  }
}

export default Team1;
