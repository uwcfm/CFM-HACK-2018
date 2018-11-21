// Sherman Grewal
// Oliver Lingertat
// Luncy Cheng
// Navya Mehta

import React, { Component } from 'react';
import StockStats from '../../../Data/stocks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Jumbotron,Button, Nav, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./style.css";
import "./TeamProfile.js";

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
    let datesArray = [];
    StockStats[stockName].forEach(
      (day) => {
        let obj = Date.parse(day["Date"]);
        datesArray.push(obj);
      })
      return datesArray;
  }

  getcloses(stockName) {
    let closesArray = [];
    StockStats[stockName].forEach(
      (day) => {
        let obj = day["Close"];
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
  let matchedArray = [];
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
    for (let i=lengthval-39-22; i<lengthval-39; i++)
    {
      aboveval += impmult * (sma19[i+20] + ema19[i+20] + ema39[i] - 3 * closearr[i+39]);
      impmult = impmult * 1.03;
    }
    aboveval = aboveval / 22;
    return aboveval;
//    let ema19 = this.ema(stockName, 19);
//    let ema39 = this.ema(stockName, 39);
//    let sma19 = this.sma19(stockName);
//    let closearr = this.getcloses(stockName);
//    let lengthval = closearr.length;
//    let aboveval = 0;
//    let impmult = 1;
//    for (let i=lengthval-38-22; i<lengthval-38; i++)
//    {
//      aboveval += impmult * (sma19[i+20] + ema19[i+20] + ema39[i] - 3 * closearr[i+39]);
//      impmult = impmult * 1.03;
//    }
//    aboveval = aboveval / 22;
//    return aboveval;
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
    let algval = 0.35 * crossval + 0.45 * aboveval + 0.2 * slopeval;
    return algval;
    }

    top5ComparisonSort(a, b) {
      if(a[1]<b[1]) return -1;
      if(a[1]>b[1]) return 1;
      return 0;
    }
    
    top5Comparison(a, b) {//returns true if the second a[1]<b[1], else false
      if(a[1]<b[1]) return true;
      return false;
    }
    
    top5() {
      let stockLabels = Object.keys(StockStats); 
      let top5 = [];
      for (let i=0; i<stockLabels.length; i++) {
        if (top5.length<5){
          top5.push([stockLabels[i],this.mainalg(stockLabels[i])]);
          top5.sort(this.top5ComparisonSort);
        }
        if (this.top5Comparison(top5[0], [stockLabels[i],this.mainalg(stockLabels[i])])) {
          top5.shift();
          top5.push([stockLabels[i],this.mainalg(stockLabels[i])]);
          top5.sort(this.top5ComparisonSort);
        }
      }
      return top5;
    }
    
    closeDiff(stockName) {
      let closevals = this.getcloses(stockName);
      return (closevals[(closevals.length)-1]-closevals[0])/closevals[0];
    }
    
    top5CheatyVersion() {
      let stockLabels = Object.keys(StockStats); 
            let top5 = [];
            for (let i=0; i<stockLabels.length; i++) {
              if (top5.length<5){
                for (let j=0; j<5; j++){
                  top5.push([stockLabels[i],this.closeDiff(stockLabels[i])]);
                }
              top5.sort(this.top5ComparisonSort);
              }
              if (this.top5Comparison(top5[0], [stockLabels[i],this.mainalg(stockLabels[i])])) {
                top5.shift();
                top5.push([stockLabels[i],this.closeDiff(stockLabels[i])]);
                top5.sort(this.top5ComparisonSort);
              }
            }
            top5.sort(this.top5ComparisonSort);
            return top5;

    }
    
    makeOptionsLineArr() {
      let optionsLineArr = [];
      let top5Arr = this.top5();
      for (let i=0; i<5; i++) {
        let tempOptions = {
          chart: {
                  zoomType: 'x'
                },
                title: {
                  text: top5Arr[i][0]
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
                    text: 'Stock Price'
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
                series: [{
                                  type: 'area',
                                  data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.getcloses(top5Arr[i][0]),0)
                              }, {
                                  name: 'Simple Moving Average, 19-day period',
                                  data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.sma19(top5Arr[i][0]),19)
                              },{
                                name: 'Exponential Moving Average, 19-day period',
                                data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.ema(top5Arr[i][0], 19),19)
                              }]
                
        }
        optionsLineArr.push(tempOptions);
      }
      return optionsLineArr;
    }


  render() {
    
    let top5Arr = this.top5();
    var optionsLineArr = this.makeOptionsLineArr();
    for (let i=0; i<5; i++){
      console.log(top5Arr[i]);
    }
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


        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
          <div class = "container-fluid">
              <a class = "navbar-brand" href="#"><img height = "100" width = "100"
              src="https://previews.dropbox.com/p/thumb/AARvvVOiROWPtmx5Amxf4GgSQUwhyOfsGgdyaBLFof4pluv6nV-t-311fSlQOWJc8MST3k-oyhTYe78K6IOikwMSY665emI2DSJpeZ0Q-sLATEt-jvkdf4fOEiW-V0udiqm86Uk44E6RxULCTup8DJDeMbkhNKop9pF7opuwu1Mr9tTzLSS6TJENA8BKKJdMopPDiod0mCesil4E8CQ_lGyjAsxZT-Ytk8NZFzpxMgC8rQ/p.png?size=1280x960&size_mode=3"/></a>
              <button class= "navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#TeamProfile.js">Team</a>
                  </li>
                </ul>
              </div>
          </div>
        </nav> 

        <div id="slides" class="carousel slides" data-ride="carousel">

        <div class= "carousel-inner">
          <div class = "carousel-item active">
            <img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1950&q=80"/>
            <div class= "carousel-caption">
              <h1 class="display-2">Two Alpha</h1>
              <h3>Investments Group</h3>

            </div>
          </div>
          
        </div>
        </div>

      <Jumbotron>
      <h1>Two Alpha's Team</h1>
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
                        <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/40764729_1092848604225011_2272057516563103744_n.jpg?_nc_cat=101&_nc_ht=scontent.fyyz1-1.fna&oh=2865d2945eef4c230b45458d2fbc202d&oe=5CB170F2"
                        class="image card-img-top"></img>
                        <div class="overlay overlayFade">
                            <div class="text">With his passion for technology and his eagerness to learn, Oliver is excited to be part of CFM. He is looking forward to his co-op terms, during which he plans to explore the wide variety of opportunities available to those well-versed in both finance and computer science. In his free time, Oliver enjoys listening to and playing music; he is keeping up his musical hobbies by playing violin in the university orchestra, and he will be playing in the pit orchestra for a production of Beauty and the Beast next term. Oliver was also on the MEF Funding Council this term and plans to become further involved in MEF activities during the winter term.</div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h4 class="card-title">Oliver Lingertat</h4>
                            <p class="card-text">Software Developer</p>
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
              options={optionsLineArr[4]}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLineArr[3]}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLineArr[2]}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLineArr[1]}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsLineArr[0]}
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
