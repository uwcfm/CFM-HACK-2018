// Sherman Grewal
// Oliver Lingertat
// Lucy Cheng
// Navya Mehta
import React, { Component } from 'react';
import { render } from "react-dom";
import StockStats from '../../../Data/stocks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Jumbotron } from 'reactstrap';


class stockobj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullray: [StockStats.map(function(x){
        x.map(function(day) {return day.Close})
      }), [], []]
    };
  }
  sma19() {
    let fullarr = this.state.fullray;
    let closearr = fullarr[0];
    let curema = fullarr[2];
    let sma = closearr.map(function(stock) {
      let temparr = stock;
      for (var i=0; i<19; i++)
      {
        temparr[i] = 0;
      }
      for (var i=19; i < 365; i++)
      {
        let temp = 0;
        for (var j = i-19; j<i; j++)
        {
          temp = temp + stock[j];
        }
        temparr[i] = temp / 19;
      }
      return temparr;
    });
    this.setState({fullray: [closearr, sma, curema]});
  }
  ema19() {
    let expmul = 0.1;
    let fullarr = this.state.fullray;
    let sma = fullarr[1];
    let closearr = fullarr[0];
    let ema = closearr.map(function(stock) {
      let tempema = stock;
      for (var i=0; i<19; i++)
      {
        tempema[i] = 0;
      }

      for (var i=20; i<365; i++)
      {
        tempema[i] = expmul * (tempema[i]-tempema[i-1]) + tempema[i-1];
      }
      return tempema;
    });
    this.setState({fullray: [closearr, sma, ema]});
  }
}
export default stockobj;
