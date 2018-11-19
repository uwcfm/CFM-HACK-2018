// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

import React, { Component } from 'react';
import Analysis from "./Analysis.js";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Jumbotron } from 'reactstrap';

var analysis = new Analysis();

class MethodPage extends Component {
	
	constructor(props) {
		super(props);

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