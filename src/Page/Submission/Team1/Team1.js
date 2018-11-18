// Sherman Grewal
// Oliver Lingertat
// Luncy Cheng
// Navya Mehta

import React, { Component } from 'react';
//import StockStats from '../../../Data/stocks';
//import Alg from './Algorithm'
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

class Example extends Component {
  
  render() {
    options['series'] = [{
        type: 'area',
        data: [[
            Date.parse("2017-11-01"),
            0.7537
          ],
          [
            Date.parse("2017-11-02"),
            0.7537
          ],
          [
            Date.parse("2017-11-03"),
            0.7559
          ],
          [
            Date.parse("2017-11-04"),
            0.7631
          ],
          [
            Date.parse("2017-11-05"),
            0.7644
          ],
          [
            Date.parse("2017-11-06"),
            0.769
          ]]
    },{
          data:[[
             Date.parse("2017-11-01"),
                      0.8537
                    ],
                    [
                      Date.parse("2017-11-02"),
                      0.8537
                    ],
                    [
                      Date.parse("2017-11-03"),
                      0.8559
                    ],
                    [
                      Date.parse("2017-11-04"),
                      0.8631
                    ],
                    [
                      Date.parse("2017-11-05"),
                      0.8644
                    ],
                    [
                      Date.parse("2017-11-06"),
                      0.869
                    ]]
          
      }];
    return (
      <div className='container'>
        <Jumbotron fluid>
          <div className='container'>
            <h2>Example: NBA {Date.parse("2017-11-05")}</h2>
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
export default Example;
