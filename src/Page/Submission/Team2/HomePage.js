// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

import React, { Component } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Jumbotron } from 'reactstrap';

class HomePage extends Component {
	render() {
		return (
			<div id="homePage">
				<div id="container">
					<div id="background">
					</div>
				</div>
				<div id="blurb">
					<h1> blurb blurb blurb </h1>
					<h2> HEADER </h2>
					<p> another blurb about us continuing on here
						ahhahahha so rn it's rlly random but we
						get the point </p>
				</div>
				<div className="summary">
					<h1> Title - Summary </h1>
					<div id="company1">
					</div>
					<div id="company2">
					</div>
					<div id="company3">
					</div>
					<div id="company4">
					</div>
					<div id="company5">
					</div>
				</div>
			</div>
		)
	}
}

export default HomePage;