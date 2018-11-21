// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

//read in stock json
var data = require("./../../../Data/stocks.json");

//constructor for Analysis class, 
function Analysis() {
	
	//used to record statistics about each stock
	this.profiles = [];
	
	//call to begin analysis of stocks
	this.run = function() {
		var start = new Date();
		this.profiles = generateProfiles();
		console.log("generated " + Object.keys(data).length + " profiles in " + (new Date() - start) + "ms!");
		console.log(this.profiles);
	}
}

//export Analysis to make it available to other files
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

//calculates the exponential moving average over a dataset, over the last n
//samples
function EMA(dataset, n) {
	var result = [];
	var avg = undefined;
	for (var i = 0; i < dataset.length; i++) {
		if (avg === undefined) {
			avg = dataset[i];
		}
		else {
			avg = (avg * (n - 1) + dataset[i]) / n;
		}
		result.push(avg);
	}
	return result;
}

//generates an array of values of a particular property of a stock over the
//dataset
function getValues(stock, propKey) {
	var values = [];
	for (var i = 0; i < stock.length; i++) {

		values.push(stock[i][propKey]);
	}
	return values;
}

//calculates average daily return over the whole dataset for a given stock,
//using the closing price
function getAvgAnnualReturn(stock) {
	
	//assume there are 365 days in a year
	const daysPerYear = 365;
	
	//sum daily returns
	var sum = 0;
	for (var i = 1; i < stock.length; i++) {
		
		//read current and previous closing price
		var c0 = stock[i - 1].Close;
		var c1 = stock[i].Close;
		
		//skip this term if we have bad values
		if (c0 === null || c1 === null) {
			continue;
		}
		
		//add daily return;
		sum += (stock[i].Close - stock[i - 1].Close) / stock[i - 1].Close;
	}
	
	//take average
	var avg = sum / (stock.length - 1);
	
	//calculate yearly return, return value
	return avg * daysPerYear;
}

//calculates compounding daily return for a given stock
function getCompoundReturn(stock) {
	
	//get necessary values
	var beginningBalance = stock[0].Close; 
	var endingBalance = stock[stock.length - 1].Close;
	var nPeriods = stock.length;
	
	//calculate compounding return, return value
	return Math.pow(endingBalance / beginningBalance, 1 /  nPeriods) - 1;
}

//calculates the average value of a dataset
function getAvg(dataset) {
		
	var sum = 0;
	
	for (var i = 0; i < dataset.length; i++) {
		sum += dataset[i];
	}
	
	return sum / dataset.length;
}

//calculates the standard deviation across a dataset
function stdDev(dataset) {
	
	//get average value
	var avg = getAvg(dataset);
	
	//calculate summation
	var sum = 0;
	for (var i = 0; i < dataset.length; i++) {
		sum += Math.pow(dataset[i] - avg, 2);
	}
	
	//calculate standard deviation, return value
	return Math.sqrt(sum / (dataset.length - 1));
}

//calculates Sharpe ratio for a given stock
function getSharpe(stock) {
	
	//assume the risk-free rate of return to be 3.2%
	const riskFreeRate = .032;
	
	//get standard deviation
	var sd = stdDev(getValues(stock, "Close"));
	
	//calculate Sharpe ratio, return value
	return (getAvgAnnualReturn(stock) - riskFreeRate) / sd;
}

//calculates the Kurtosis of a dataset
function getKurtosis(dataset) {
	
	//get average value
	var avg = getAvg(dataset);

	//get standard deviation
	var sd = stdDev(dataset);

	//calculate summation
	var sum = 0;
	for (var i = 0; i < dataset.length; i++) {
		
		//calculate the difference between this sample and the average value
		var dif = dataset[i] - avg;
		
		//calculate term and add to sum
		sum += Math.pow(dif / sd, 4);
	}
	
	//calculate Kurtosis, return value
	return sum / dataset.length;
}

//constructor for a Profile, storing stats and a rating for a given stock based
//on a set of indicators
function Profile(ticker, stock) {
	
	//these constants are weights used to rate the stock
	this.wAvgAnnualReturn = .25;
	this.wCompoundReturn = .10;
	//this.wSMA = .25;		//this feature was removed
	this.wSharpe = .20;
	this.wKurtosis = .20;
	
	//the total weight is used to normalize the weights
	this.totalWeight =
		this.wAvgAnnualReturn +
		this.wCompoundReturn +
		//this.wSMA +	//this feature was removed
		this.wSharpe +
		this.wKurtosis;
	
	//record ticker and data, just in case we decide to graph it
	this.ticker = ticker;
	this.data = stock;
	
	//record values used to rate stock
	this.avgAnnualReturn = getAvgAnnualReturn(stock);
	this.pointsFromAnnualReturn =
		this.avgAnnualReturn * this.wAvgAnnualReturn;
	this.compoundReturn = getCompoundReturn(stock);
	this.pointsFromCompoundReturn =
		this.compoundReturn * this.wCompoundReturn;
	/*this.sma = SMA(getValues(stock, "Close"), 50)[stock.length - 1];
	this.pointsFromSMA =
		this.sma * this.wSMA;*/		//this feature was removed
	this.sharpe = getSharpe(stock);
	this.pointsFromSharpe =
		this.sharpe * this.wSharpe;
	this.kurtosis = getKurtosis(getValues(stock, "Close"));
	this.pointsFromKurtosis =
		this.kurtosis * this.wKurtosis;
	
	//calculate final score
	this.rating = (
		this.pointsFromAnnualReturn +
		this.pointsFromCompoundReturn +
		//this.pointsFromSMA +	//this feature was removed
		this.pointsFromSharpe +
		this.pointsFromKurtosis
		) / this.totalWeight;
}

//inserts a stock profile into a sorted list of stock profiles
function insertProfile(profile, list) {
	
	//compare this profile to all the profiles in the list, in order
	for (var i = 0; i < list.length; i++) {
		
		//if the new profile is ranked higher than a profile in the list,
 		//insert the new profile before this profile and return the new list
		if (profile.rating > list[i].rating) {
			var temp = list.slice(0, i);
			temp.push(profile);
			return temp.concat(list.slice(i));
		}
	}
	
	//if the profile was not rated higher than any others, place it at the 
	//bottom of the list and return the new list
	list.push(profile);
	return list;
}

//generates profiles for and orders all stocks
function generateProfiles() {
	
	//create empty list to accumulate profiles
	var profiles = [];
	
	//generate and insert a profile for each stock
	for (var key in data) {
		profiles = insertProfile(new Profile(key, data[key]), profiles);
	}
	
	return profiles;
}