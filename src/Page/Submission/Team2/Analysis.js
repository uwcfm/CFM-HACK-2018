// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

const riskFreeRate = .032;

//read in stock json
var data = require("./../../../Data/stocks.json");

//constructor for Analysis class, 
function Analysis() {
	
	//used to record calculated values
	this.stats = {};
	
	//call to begin analysis of stocks
	this.run = function() {
		
		//iterate through stocks
		for (var key in data) {
			//TODO process each stock, write into this.stats
		}
	}
}

export default Analysis;

//calculates the simple moving average over a dataset, over the last n samples
function SMA(dataset, n) {
	var result = [];
	for (var i = 0; i < dataset.length; i++) {
		var sum = 0, m = 0;
		for (var j = Math.max(i - n + 1, 0); j <= i; j++) {
			sum += dataset[j];
			m++;
		}
		result.push(sum / m);
	}
	return result;
}

//calculates the exponential moving average over a dataset, over the last n samples
function EMA(dataset, n) {
	var result = [];
	var avg = undefined;
	for (var i = 0; i < dataset.length; i++) {
		if (avg == undefined) {
			avg = dataset[i];
		}
		else {
			avg = (avg * (n - 1) + dataset[i]) / n;
		}
		result.push(avg);
	}
	return result;
}

//generates an array of values of a particular property of a stock over the dataset
function getValues(stock, propKey) {
	var values = [];
	for (var i = 0; i < stock.length; i++) {

		values.push(stock[i][propKey]);
	}
	return values;
}
