// Sherman Grewal
// Oliver Lingertat
// Lucy Cheng
// Navya Mehta
import React, { Component } from 'react';
import { render } from "react-dom";
import StockStats from '../../../Data/stocks';


class stockobj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullray: [Object.keys(StockStats), StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      })]
    };
  }
  sma19() {
    let fullarr = this.state.fullray;
    let closearr = fullarr[1];
    var sma = closearr.map(function(stock) {
      let temparr = stock;
      for (let i=0; i<19; i++)
      {
        temparr[i] = 0;
      }
      for (let i=19; i < 365; i++)
      {
        let temp = 0;
        for (let j = i-19; j<i; j++)
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
    let fullarr = this.state.fullray;
    let closearr = fullarr[1];
    let ema = closearr.map(function(stock) {
      let tempema = stock;
      let temp = 0;
      for (let i=0; i<19; i++)
      {
        temp = temp + tempema[i];
        tempema[i] = 0;
      }
      tempema[19] = temp / 19;
      for (let i=20; i<365; i++)
      {
        tempema[i] = expmul * (tempema[i]-tempema[i-1]) + tempema[i-1];
      }
      return tempema;
    });
    return ema;
  }
  ema39() {
    let expmul = 0.05;
    let fullarr = this.state.fullray;
    let closearr = fullarr[1];
    let ema = closearr.map(function(stock) {
      let tempema = stock;
      let temp = 0;
      for (let i=0; i<39; i++)
      {
        temp = temp + tempema[i];
        tempema[i] = 0;
      }
      tempema[39] = temp / 39;
      for (let i=40; i<365; i++)
      {
        tempema[i] = expmul * (tempema[i]-tempema[i-1]) + tempema[i-1];
      }
      return tempema;
    });
    return ema;
  }
  goldencrossval() {
    let ema19 = this.ema19();
    let ema39 = this.ema39();
    let crossval = new Array(60);
    let impmult = 1;

    for (let i = 0; i<60; i++)
    {
      crossval[i] = 0;
      for (let j = 335; j<365; j++)
      {
        crossval[i] = crossval[i] + impmult * (ema19[i][j] - ema39[i][j]);
        impmult = impmult * 1.03;
      }
      impmult = 1;
    }
    return crossval;
  }
  maabove() {
    let ema19 = this.ema19();
    let ema39 = this.ema39();
    let sma19 = this.sma19();
    let fullarr = this.state.fullray;
    let close = fullarr[1];
    let aboveval = new Array(60);
    let impmult = 1;
    for (let i=0; i<60; i++)
    {
      aboveval[i] = 0;
      for (let j=335; j<365; j++)
      {
        aboveval[i] = aboveval[i] + impmult *
        (ema19[i][j] + ema39[i][j] + sma19[i][j] - 3 * close[i][j]);
        impmult = impmult * 1.03;
      }
      impmult = 1;
    }
    return aboveval;
  }
  emaslope() {
    let ema19 = this.ema19();
    let sloper = ema19.map(function(stock){
      let tempslope = 0;
      let impmult = 1;
      for (let i = 335; i<365; i++)
      {
        tempslope = tempslope + impmult * (stock[i]-stock[i-1]);
        impmult = impmult * 1.03;
      }
      tempslope = tempslope / 30;
      return tempslope;
    });
    return sloper;
  }
  mainalg() {
    let slopeval = this.emaslope();
    let crossval = this.goldencrossval();
    let aboveval = this.maabove();
    let fullarr = this.state.fullray;
    let keyval = fullarr[0];
    let closeval = fullarr[1];
    let ema19 = this.ema19();
    let sma19 = this.sma19();
    let ema39 = this.ema39();
    let algval = new Array(60);
    for (let i=0; i<60; i++)
    {
      algval[i] = 0.4 * crossval[i] + 0.3 * aboveval[i] + 0.3 * slopeval[i];
    }
    return [algval, keyval, closeval, sma19, ema19, ema39, slopeval, crossval, aboveval];
  }
}
export default stockobj;
