// Sherman Grewal
// Oliver Lingertat
// Luncy Cheng
// Navya Mehta

import React, { Component } from 'react';
import StockStats from '../../../Data/stocks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Jumbotron,Button } from 'reactstrap';
import "./style.css";

var optionsPie = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Percentage of Portfolio'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    }
}

var optionsLine = {
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

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

class Team1 extends Component {

  getdates(stockName) {
    var datesArray = [];
    StockStats[stockName].forEach(
      (day) => {
        var obj = Date.parse(day["Date"]);
        datesArray.push(obj);
      })
      return datesArray;
  }

  getcloses(stockName) {
    var closesArray = [];
    StockStats[stockName].forEach(
      (day) => {
        var obj = day["Close"];
        closesArray.push(obj);
      })
      return closesArray;
  }

  sma19(stockName) {
    let closearr = this.getcloses(stockName);
    let sma = [];
      for (let i=19; i < closearr.length; i++)
      {
        let temp = 0;
        for (let j = i-19; j<i; j++)
        {
          temp = temp + closearr[j];
        }
        sma.push(temp / 19);
      }
    return sma;
  }

  ema(stockName, period) {//period is the number of days to consider. NOTE: when calling this function to graph it, period should equal shift.
      let expmul = 2/(period + 1);
      let closearr = this.getcloses(stockName);

      let ema = [];
      let firstperiodclosingsum = 0;
      for (let i = 0; i<period; i++) {
        firstperiodclosingsum += closearr[i];
      }
      ema.push(firstperiodclosingsum/period);
      for (let i=period; i<closearr.length; i++) {//[Closing price-EMA (previous day)] x multiplier + EMA (previous day)
        ema.push((expmul * (closearr[i]-ema[i-period])) + ema[i-period]);
      }
      return ema;
    }


  matchDateAndValues(dates, values, shift) {//organizes two sets of data so they can be graphed against each other, shift is for data that starts after a certain point (for example, set shift = 19 for graphing sma19("sockName"), set shift = 0 for graphing closing values.)
  var matchedArray = [];
    for (let i = shift; i < dates.length; i++) {
      matchedArray.push([
        dates[i],
        values[i-shift]
      ]);
    }
    return matchedArray;
  }

  goldencrossval(stockName) {
    let ema19 = this.ema(stockName, 19);
    let ema39 = this.ema(stockName, 39);
    let closearr = this.getcloses(stockName);
    let lengthval = closearr.length;
    let crossval = 0;
    let impmult = 1;
    for (let i=lengthval-38-22; i<lengthval-38; i++)
    {
      crossval += impmult * (ema19[i+20] - ema39[i]);
      impmult = impmult * 1.03;

    }
    crossval = crossval / 22;
    return crossval;
  }

  maabove(stockName) {
    let ema19 = this.ema(stockName, 19);
    let ema39 = this.ema(stockName, 39);
    let sma19 = this.sma19(stockName);
    let closearr = this.getcloses(stockName);
    let lengthval = closearr.length;
    let aboveval = 0;
    let impmult = 1;
    for (let i=lengthval-38-22; i<lengthval-38; i++)
    {
      aboveval += impmult * (sma19[i+20] + ema19[i+20] + ema39[i] - 3 * closearr[i+39]);
      impmult = impmult * 1.03;
    }
    aboveval = aboveval / 22;
    return aboveval;
  }

  emaslope(stockName) {
    let ema19 = this.ema(stockName, 19);
    let lengthema = ema19.length;
    let sloper = 0;
    let impmult = 1;
    for (let i=lengthema-22; i< lengthema; i++)
    {
      sloper += impmult * (ema19[i]-ema19[i-1]);
      impmult = impmult * 1.03;
    }
    sloper = sloper / 22;
    return sloper;
  }

  mainalg(stockName) {
    let slopeval = this.emaslope(stockName);
    let crossval = this.goldencrossval(stockName);
    let aboveval = this.maabove(stockName);
    let algval = 0.4 * crossval + 0.3 * aboveval + 0.3 * slopeval;
    return algval;
    }

  render() {
    optionsLine['series'] = [{
        type: 'area',
        data: this.matchDateAndValues(this.getdates("ABX.TO"), this.getcloses("ABX.TO"),0)
    }, {
        name: 'Installation',
        data: this.matchDateAndValues(this.getdates("ABX.TO"), this.sma19("ABX.TO"),19)
    },{
      data: this.matchDateAndValues(this.getdates("ABX.TO"), this.ema("ABX.TO", 19),19)
    }];
    optionsPie['series'] = [{
      name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Label1',
            y: 61.41
          }, {
            name: 'Label2',
            y: 18.89
          }, {
            name: 'Label3',
            y: 10.85
          }, {
            name: 'Label4',
            y: 4.67
          }, {
            name: 'Label5',
            y: 4.18
          }]
    }];

    return (
    <div className='container'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"/>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"/>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"/>
    <link href="style.css" rel="stylesheet"/>
  <Jumbotron fluid>
      <h1>Welcome to Team 1!</h1>
      <div class='container2-fluid padding'>
        <div class="row padding">
                <div class="col-lg-4">
                    <div class="card">
                    <div class="container2">
                        <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/45558016_197398521155129_5335448614086901760_n.jpg?_nc_cat=105&_nc_ht=scontent.fyyz1-1.fna&oh=779585b3f66e7b3621f6e94f7951a2e3&oe=5C68CDFB"
                        class="image card-img-top"></img>
                        <div class="overlay overlayFade">
                            <div class="text">Sherman Grewal is a first year Computing and Financial Management student at the University of Waterloo. With hEDGE being Sherman’s first official step into the world of finance, Sherman is looking forward to applying his knowledge in computer science to the finance world. Sherman hopes to bring a new aspect to the team with his knowledge in software development and interest in the fintech sector. Sherman enjoys working out and playing basketball during his free time, as well as working on his current software projects.</div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h4 class="card-title">Sherman Grewal</h4>
                            <p class="card-text">Software Developer</p>
                                <div class = "team-social">
                                    <a href="https://www.linkedin.com/in/sherman-grewal/"><i class="fab fa-linkedin"></i></a>
                                    <a href="mailto:s.grewal@hedgeconference.ca"><i class="fab fa-google"></i></a>
                                </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card" >
                    <div class="container2">
                        <img src="https://scontent.fyto1-1.fna.fbcdn.net/v/t1.15752-0/p280x280/46480301_560467854377260_1744096265110552576_n.jpg?_nc_cat=105&_nc_ht=scontent.fyto1-1.fna&oh=a37321acbff527f633a83131fe90767b&oe=5C83A6C5"
                  class="image card-img-top"></img>
                        <div class="overlay overlayFade">
                            <div class="text">As an avid tech enthusiast, voracious reader, and passionate public speaker, Navya has continuously immersed himself in the realm of financial technologies, quantitative trading and econometrics. He believes that data science holds the power to truly shape human behaviour and structure the unstructured: a belief that manifests in his resolute commitment for data-driven financial architecture and high-frequency-trade systems. A foodie by the day and binge-watcher by the night, Navya is knowledgeable about everything Suits and Brooklyn 99 - a raw elemental passion that he brings to the table in his investment endeavours.</div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h4 class="card-title">Navya Mehta</h4>
                            <p class="card-text">Software Developer</p>
                                <div class = "team-social">
                                    <a href="https://www.linkedin.com/in/sherman-grewal/"><i class="fab fa-linkedin"></i></a>
                                    <a href="mailto:s.grewal@hedgeconference.ca"><i class="fab fa-google"></i></a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <div class='container2-fluid padding'>
        <div class="row padding">
                <div class="col-lg-4">
                    <div class="card" >
                    <div class="container2">
                        <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/45558016_197398521155129_5335448614086901760_n.jpg?_nc_cat=105&_nc_ht=scontent.fyyz1-1.fna&oh=779585b3f66e7b3621f6e94f7951a2e3&oe=5C68CDFB"
                        class="image card-img-top"></img>
                        <div class="overlay overlayFade">
                            <div class="text">Sherman Grewal is a first year Computing and Financial Management student at the University of Waterloo. With hEDGE being Sherman’s first official step into the world of finance, Sherman is looking forward to applying his knowledge in computer science to the finance world. Sherman hopes to bring a new aspect to the team with his knowledge in software development and interest in the fintech sector. Sherman enjoys working out and playing basketball during his free time, as well as working on his current software projects.</div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h4 class="card-title">Sherman Grewal</h4>
                            <p class="card-text">First Year Associate</p>
                                <div class = "team-social">
                                    <a href="https://www.linkedin.com/in/sherman-grewal/"><i class="fab fa-linkedin"></i></a>
                                    <a href="mailto:s.grewal@hedgeconference.ca"><i class="fab fa-google"></i></a>
                                </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card" >
                    <div class="container2">
                        <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/45558016_197398521155129_5335448614086901760_n.jpg?_nc_cat=105&_nc_ht=scontent.fyyz1-1.fna&oh=779585b3f66e7b3621f6e94f7951a2e3&oe=5C68CDFB"
                        class="image card-img-top"></img>
                        <div class="overlay overlayFade">
                            <div class="text">Sherman Grewal is a first year Computing and Financial Management student at the University of Waterloo. With hEDGE being Sherman’s first official step into the world of finance, Sherman is looking forward to applying his knowledge in computer science to the finance world. Sherman hopes to bring a new aspect to the team with his knowledge in software development and interest in the fintech sector. Sherman enjoys working out and playing basketball during his free time, as well as working on his current software projects.</div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h4 class="card-title">Sherman Grewal</h4>
                            <p class="card-text">First Year Associate</p>
                                <div class = "team-social">
                                    <a href="https://www.linkedin.com/in/sherman-grewal/"><i class="fab fa-linkedin"></i></a>
                                    <a href="mailto:s.grewal@hedgeconference.ca"><i class="fab fa-google"></i></a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </Jumbotron>



        <Jumbotron fluid>
          <div className='container'>
            <h2>Example: NBA </h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLine}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLine}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsPie}
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
