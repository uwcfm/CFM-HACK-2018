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
      closeval: StockStats.map(function(x){
        x.map(function(day) {return day.Close})
      })
    };
  }
  sma19() {
    let closearr = this.state.closeval;
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
    return sma;
  }
  ema19() {
    let expmul = 0.1;
    let closearr = this.state.closeval;
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
    return ema;
  }
}
export default stockobj;
