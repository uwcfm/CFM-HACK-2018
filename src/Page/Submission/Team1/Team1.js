// Sherman Grewal
// Oliver Lingertat
// Luncy Cheng
// Navya Mehta

import React, { Component } from 'react';
import StockStats from '../../../Data/stocks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Jumbotron } from 'reactstrap';


var options = {
  chart: {
          zoomType: 'x'
        },
        title: {
          text: 'USD to EUR exchange rate over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
}



class Team1 extends Component {
  
 getClose(stockName) {
  var closeArray = [];
  StockStats[stockName].forEach(
    (day) => {
      var obj = [
        Date.parse(day["Date"]),
        day["Close"]
      ];
      closeArray.push(obj);
    })
    return closeArray;
};
  
  render() {
    options['series'] = [{
        type: 'area',
        data: this.getClose("ABX.TO")
    }];
    return (
      <div className='container'>
        <Jumbotron fluid>
          <div className='container'>
            <h2>Example: NBA </h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
            Reference:
            <a href="https://api.highcharts.com/highcharts/series.scatter">Highcharts API</a>
            <a href="https://dynasties.operationsports.com/team-colors.php?sport=nba">Color Link </a>
          </div>
        </Jumbotron>
      </div>
    )
  }
}
export default Team1;
