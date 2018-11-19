// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

import React, { Component } from 'react';
import Analysis from "./Analysis.js";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Jumbotron } from 'reactstrap';

//this object actually runs the analysis
var analysis = new Analysis();

//this class refers to the page where we explain our porfolio analysis strategy
class MethodPage extends Component {
	
	//create this component
	constructor(props) {
		
		//call base constructor
		super(props);

		//run analysis
		console.log("running analysis...");
		analysis.run();
		console.log("analysis complete");
	}
	
	render() {
		return (
			<div id="methodPage">
				<div><h1>OUR METHOD</h1></div>
			</div>
		)
	}
}

export default MethodPage;