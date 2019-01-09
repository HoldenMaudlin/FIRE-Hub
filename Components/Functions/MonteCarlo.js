/*
Monte Carlo Simulation:

*/

import { _stringToInt } from '../Functions/ParseNumber'


function _getDistributedList(n, mean, sd) {
    var list = _randomList(n, 0, 1)
    var newList = _distributedList(list, mean, sd)
    return newList
}

// Generate random list with given mean and SD
function _randomList(n, a, b) {
    // create a list of n numbers between a and b
    var list = [],
      i;
    for (i = 0; i < n; i++) {
      list[i] = Math.random() * (b - a) + a;
    }
    return list;
}

function _descriptives(list) {
    // compute mean, sd and the interval range: [min, max]
    var mean,
        sd,
        i,
        len = list.length,
        sum,
        a = Infinity,
        b = -a;

    for (sum = i = 0; i < len; i++) {
        sum += list[i];
        a = Math.min(a, list[i]);
        b = Math.max(b, list[i]);
    }
    mean = sum / len;
    for (sum = i = 0; i < len; i++) {
        sum += (list[i] - mean) * (list[i] - mean);
    }
    sd = Math.sqrt(sum / (len - 1));
    return {
        mean: mean,
        sd: sd,
        range: [a, b]
    };
}

function _distributedList(list, mean, sd) {
    var oldDescriptives = _descriptives(list),
    oldMean = oldDescriptives.mean,
    oldSD = oldDescriptives.sd,
    newList = [],
    len = list.length,
    i;
    for (i = 0; i < len; i++) {
        newList[i] = sd * (list[i] - oldMean) / oldSD + mean;
    }
    return newList;
}

// Insertion sort for monte carlo data
function _sortData(data, length) {
    for (var i = 0; i < data.length; i++) {
        let value = data[i]
        for (var j = i - 1; j > -1 && data[j][length] > value[length]; j--) {
          data[j + 1] = data[j]
        }
        data[j + 1] = value
    }
    return [data[Math.floor(data.length / 10 - 1)], data[Math.floor(data.length/2 - 1)], data[Math.floor(data.length * 9 / 10 - 1)]]
}

export function _createMonteCarloData( assets, income, spend, returns, sims, length ) {
    // Convert inputs from strings to numbers
    assets = _stringToInt(assets)
    income = _stringToInt(income)
    spend = _stringToInt(spend)
    returns = parseFloat(returns)
    sims = parseInt(sims) > 10000 ? 10000 : parseInt(sims)
    length = parseInt(length) > 50 ? 50 : parseInt(length)
    
    // S&P 500 aerages
    const vol = .144
    const ret = 0.072

    // Iterate by month
    const steps = 12 * length
    const dt = 1/12

    // Constants for brownian motion process
    const sqdt = Math.sqrt(dt)
    const drift = (ret - vol*vol/2) * dt
    const shock = vol * sqdt

    var savings = assets + (income - spend);
    var data = []

    // Create & Populate the 2D array
    for (var i = 0; i < sims; i++) {
        data[i] = []
        data[i][0] = savings
    }
    
    // Iterate through number of months user requested
    for(var m = 1; m < steps ; m++) {
        var rates = []
        // Gets Brownian generate random numbers
        rates = _getDistributedList(sims, 0, 1);
        for (var k = 0; k < sims; k++) {
            data[k][m] = data[k][m - 1] * (Math.exp(drift + shock * rates[k]))
            data[k][m] += (income - spend) * dt
        }
    }
    // Returns data after insertion sort is applied
    return _sortData(data, steps - 1);
}
