// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

var data = require("C:/Users/Tony/CFM-HACK-2018/src/Data/stocks.json");

function Analysis() {
	
	this.stats = {};
	
	this.run = function() {
		
		console.log("reading " + Object.keys(data).length + " stocks");
		
		for (var key in data) {
			console.log(key + ": " + SMA(getHighs(data[key]), 20));
			console.log(key + ": " + EMA(getHighs(data[key]), 20));
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
			sum += dataset[i];
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

//generates an array of daily highs for a given stock
function getHighs(stock) {
	var highs = [];
	for (var i = 0; i < stock.length; i++) {
		highs.push(stock[i].High);
	}
	return highs;
}