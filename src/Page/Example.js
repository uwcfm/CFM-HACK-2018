import React, { Component } from 'react';
// import Players from '../Data/players';
import PlayerStats from '../Data/playerStats';
import Teams from '../Data/teams';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

var options = {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'NBA Player\'s Score Breakdown'
  },
  subtitle: {
    text: 'Source: Heinz  2003'
  },
  xAxis: {
    title: {
        enabled: true,
        text: 'Height (cm)'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
  },
  yAxis: {
      title: {
          text: 'Weight (kg)'
      }
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 100,
    y: 70,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
    borderWidth: 1
},
plotOptions: {
    scatter: {
        marker: {
            radius: 5,
            states: {
                hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                }
            }
        },
        states: {
            hover: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} cm, {point.y} kg'
        }
    }
  },
}

class Example extends Component {
  convertPlayerStatJSON () {
    var headers = PlayerStats.headers;
    var statsArr = PlayerStats.rowSet;
    var statsJSONArr = [];
    statsArr.forEach(
      (entry) => {
        var obj = {};
        headers.forEach((header, index) =>{
          obj[header] = entry[index];
        })
        statsJSONArr.push(obj);
      }
    )
    return statsJSONArr;
  }
  generateSeries (statsJSONArr) {
    // var stat = statsJSONArr[0];
    // var makeup = {};
    // var playerSeries = [];
    var series = [{
          name: 'Female',
          color: 'rgba(223, 83, 83, .5)',
          data: [[163.8, 67.3]]

      }, {
          name: 'Male',
          color: 'rgba(119, 152, 191, .5)',
          data: [[174.0, 65.6]]
      }]
      return series;
  }
  render() {
    var statsJSONArr = this.convertPlayerStatJSON();
    var series = this.generateSeries(statsJSONArr);
    options['series'] = series;
    return (
      <div className='home-container'>
        <h2>Example: NBA</h2>
        {/* <p>{Players.length}</p> */}
        {Teams.length}
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    )
  }
}
export default Example;
