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

constructor(props) {
    super(props);
    this.state = {
    keys: Object.keys(StockStats), 
    dates: StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Date;
        });
      }),
    closeVal: StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      }),
    sma19: this.sma19(),
    ema19: this.ema19(),
    ema39: this.ema39(),
    algval: this.mainalg()
    };
  }

  sma19() {
    let closearr = StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      });
    let sma = closearr.map(function(stock) {
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
    let closearr = StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      });
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
    let closearr = StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      });
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
    let close = StockStats.map(function(x) {
        return x.map(function(day) {
          return day.Close;
        });
      });
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
    let algval = new Array(60);
    for (let i=0; i<60; i++)
    {
      algval[i] = 0.4 * crossval[i] + 0.3 * aboveval[i] + 0.3 * slopeval[i];
    }
    var finalvals = [algval, slopeval, crossval, aboveval];
    return finalvals;
  }

 getClose(stockName) {
  var closeArray = [];
  var i;
  for (i = 0; i < 0; i++) {
    var obj = [
      Date.parse(this.state.dates[0][i]),
      this.state.closeVal[0][i]
    ];
    closeArray.push(obj);
  }
  return closeArray;
};

  render() {
    optionsLine['series'] = [{
        type: 'area',
        data: this.getClose("ABX.TO")
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
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"/>
	<script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"/>
	<link href="style.css" rel="stylesheet"/>
      <h1>Welcome to Team 1 Portfolio!</h1>
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
