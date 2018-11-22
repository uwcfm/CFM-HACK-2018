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
      enabled: false
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
                                  name: top5Arr[i][0],
                                  data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.getcloses(top5Arr[i][0]),0)
                              }, {
                                  name: 'Simple Moving Average, 19-day period',
                                  data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.sma19(top5Arr[i][0]),19)
                              },{
                                name: 'Exponential Moving Average, 19-day period',
                                data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.ema(top5Arr[i][0], 19),19)
                              },{
                                name: 'Exponential Moving Average, 39-day period',
                                data: this.matchDateAndValues(this.getdates(top5Arr[i][0]), this.ema(top5Arr[i][0], 39),39)
                              }]
               
        }
        optionsLineArr.push(tempOptions);
      }
      return optionsLineArr;
    }
   
    getPortfolioDistributionArr(top5Arr) {
      let boost = 0;
      let distArr = [];
      if (top5Arr[0][1]<1){
        boost = 1-top5Arr[0][1];
      }
      let sum = 0;
      for (let i=0;i<5;i++) {
        sum += Math.sqrt(top5Arr[i][1]);
      }
      for (let i=0;i<5;i++){
        distArr.push(Math.sqrt(top5Arr[i][1]) / sum);
      }
      return distArr;
    }
 
 roundoff(Port) {
    let temp = Port;
    for (let i=0; i<Port.length; i++)
    {
      temp[i] = (Math.round(temp[i] * 100));
    }
    return temp;
 }
 
  render() {
   
    let top5Arr = this.top5();
    var optionsLineArr = this.makeOptionsLineArr();
    for (let i=0; i<5; i++){
      console.log(top5Arr[i]);
    }
    let portfolioDistributionArr = this.getPortfolioDistributionArr(top5Arr);
    let rounded = this.roundoff(portfolioDistributionArr);
    optionsPie['series'] = [{
      name: 'Stock',
          colorByPoint: true,
          data: [{
            name: top5Arr[4][0],
            y: portfolioDistributionArr[4]
          }, {
            name: top5Arr[3][0],
            y: portfolioDistributionArr[3]
          }, {
            name: top5Arr[2][0],
            y: portfolioDistributionArr[2]
          }, {
            name: top5Arr[1][0],
            y: portfolioDistributionArr[1]
          }, {
            name: top5Arr[0][0],
            y: portfolioDistributionArr[0]
          }]
    }];
   
    return (
    <div className='container'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"/>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"/>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"/>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    <link href="style.css" rel="stylesheet"/>
 
 
        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
          <div class = "container-fluid">
              <a class = "navbar-brand" href="#"><img height = "75" width = "75"
              src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.15752-9/46503663_955743324632907_1995580271172255744_n.png?_nc_cat=101&_nc_ht=scontent.fyyz1-1.fna&oh=190f8abd7293e4318454beadb05cca91&oe=5C764765"/>
              </a>
          </div>
        </nav>
 
        <div id="slides" class="carousel slides" data-ride="carousel">
 
        <div class= "carousel-inner">
          <div class = "carousel-item active">
            <img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1050&q=80"/>
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
                       <img src="https://lh4.googleusercontent.com/Zh4vGsRP1Ot471HutOy0muHTnQsnDyOHjdbf8Vd8ON4X43wuoLduRV34Wm3UdFonos_ofa6A0aBTsA=w2880-h1428"
                       class="image card-img-top"></img>
                       <div class="overlay overlayFade">
                           <div class="text">Sherman Grewal is a first year Computing and Financial Management student at the University of Waterloo. 
                           With hEDGE being Sherman’s first official step into the world of finance, Sherman is looking forward to applying his knowledge 
                           in computer science to the finance world. Sherman hopes to bring a new aspect to the team with his knowledge in software development 
                           and interest in the fintech sector. Sherman enjoys working out and playing basketball during his free time, as well as working on his 
                           current software projects.</div>
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
                       <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.15752-9/p2048x2048/46495831_362603924502951_1101119792380641280_n.jpg?_nc_cat=100&_nc_ht=scontent.fyyz1-1.fna&oh=a6fa092e29026b63c1320cadd9888398&oe=5C740F72"
                 class="image card-img-top"></img>
                       <div class="overlay overlayFade">
                           <div class="text">As an avid tech enthusiast, voracious reader, and passionate public speaker, Navya has continuously immersed himself 
                           in the realm of financial technologies, quantitative trading and econometrics. He believes that data science holds the power to truly 
                           shape human behaviour and structure the unstructured: a belief that manifests in his resolute commitment for data-driven financial 
                           architecture and high-frequency-trade systems. A foodie by the day and binge-watcher by the night, Navya is knowledgeable about everything 
                           Suits and Brooklyn 99 - a raw elemental passion that he brings to the table in his investment endeavours.</div>
                       </div>
                   </div>
                       <div class="card-body">
                           <h4 class="card-title">Navya Mehta</h4>
                           <p class="card-text">Algorithm Developer</p>
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
                       <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.15752-9/46493566_334967853957916_969407099761065984_n.jpg?_nc_cat=106&_nc_ht=scontent.fyyz1-1.fna&oh=4159fb7821863b6f41d1467138ba7c9b&oe=5C73B6DD"
                       class="image card-img-top"></img>
                       <div class="overlay overlayFade">
                           <div class="text">With his passion for technology and his eagerness to learn, Oliver is excited to be part of CFM. He is looking 
                           forward to his co-op terms, during which he plans to explore the wide variety of opportunities available to those well-versed in both 
                           finance and computer science. In his free time, Oliver enjoys listening to and playing music; he is keeping up his musical hobbies by 
                           playing violin in the university orchestra, and he will be playing in the pit orchestra for a production of Beauty and the Beast next term. 
                           Oliver was also on the MEF Funding Council this term and plans to become further involved in MEF activities during the winter term.</div>
                       </div>
                   </div>
                       <div class="card-body">
                           <h4 class="card-title">Oliver Lingertat</h4>
                           <p class="card-text">Financial Engineer</p>
                       </div>
                   </div>
               </div>
               <div class="col-lg-4">
                   <div class="card" >
                   <div class="container2">
                       <img src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/46513411_1921533404567437_2315153828296523776_n.jpg?_nc_cat=102&_nc_ht=scontent.fyyz1-1.fna&oh=40dfa9a32360f25e8380771deaf09d04&oe=5C682EB2"
                       class="image card-img-top"></img>
                       <div class="overlay overlayFade">
                           <div class="text">Lucy studies CFM at the University of Waterloo. With her interest in studying algorithms and problem solving, she is passionate 
                           about various computer science concepts and is eager to learn their applications in real-world projects. Through her internship at THTF, she has 
                           gained experience in java frameworks and database programming and will continue extending her experience in future coop terms. In her free time, 
                           she enjoys listening to instrumental music and playing chess. She has participated in and won a few piano competitions, and hopes to flourish her 
                           university life by pursuing her hobbies.</div>
                       </div>
                   </div>
                       <div class="card-body">
                           <h4 class="card-title">Lucy Cheng</h4>
                           <p class="card-text">Quantitative Analyst</p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       </Jumbotron>
 
       <Jumbotron fluid>
         <div className='container'>
           <h2>Vision: Investment Strategy</h2>
           <p> The elemental strategy of Two Alpha lies in the fundamental notion of balance: from the engrained spiritual beliefs of yin-yang to the commitment to Qi, balance binds the very fabric of existence and growth. 
           At Two Alpha, we believe in the balance between risk and stability, ambition and preservation, growth and mitigation. Through extensive quantitative trading algorithms that perform detailed moving average analysis, 
           including the golden cross EMA, relationships between closing and MA as well as slope and trajectory, Two Alpha attempts to dissect the underlying behaviour, 
           actions and decisions that drive financial market forces. 
           Have a peak at our extensive investment processes below. </p>
         </div>
       </Jumbotron>

       <Jumbotron fluid>
         <div className='container'>
           <h2>Recommendation</h2>
           <p> While these stock recommendations work well in an equally weighted portfolio (20% each stock), 
           a better investment strategy would be to have a greater proportion of the better performing stocks. 
           The following proportions are ideal, based on the relative strength of each stock. </p>
           <table class="w3-table-all w3-hoverable w3-centered">
           <tr>
             <th> Stock Ticker </th>
             <th> Proportion (%) </th>
           </tr>
           <tr class="w3-hover-grey">
             <td> {top5Arr[4][0]} </td>
             <td> {rounded[4]} </td>
           </tr>
           <tr class="w3-hover-grey">
             <td> {top5Arr[3][0]} </td>
             <td> {rounded[3]} </td>
           </tr>
           <tr class="w3-hover-grey">
             <td> {top5Arr[2][0]} </td>
             <td> {rounded[2]} </td>
           </tr>
           <tr class="w3-hover-grey">
             <td> {top5Arr[1][0]} </td>
             <td> {rounded[1]} </td>
           </tr>
           <tr class="w3-hover-grey">
             <td> {top5Arr[0][0]} </td>
             <td> {rounded[0]} </td>
           </tr>
           </table>
           <br/>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsPie}
           />
         </div>
       </Jumbotron>

 
       <Jumbotron fluid>
         <div className='container'>
           <h2>Stock Data for Given Period </h2>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsLineArr[4]}
           />
           <br/>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsLineArr[3]}
           />
           <br/>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsLineArr[2]}
           />
           <br/>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsLineArr[1]}
           />
           <br/>
           <HighchartsReact
             highcharts={Highcharts}
             options={optionsLineArr[0]}
           />
         </div>
       </Jumbotron>
     </div>
   )
 }
}
 
export default Team1;