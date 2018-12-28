function _getDistributedList(n, mean, sd) {
    var list = _randomList(n, 0, 1)
    var newList = _distributedList(list, mean, sd)
    return newList
}

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

export function _createMonteCarloData( age, assets, income, spend, length, sims ) {
    // Convert inputs from strings to numbers
    console.log("made it here")
    var savings = assets + (income - spend);
    
    var data = []

    for (var i = 0; i < sims; i++) {
        data[i] = []
        data[i][0] = savings
    }
    
    for(var m = 1; m < length ; m++) {
        var rates = []
        rates = _getDistributedList(sims, 7.2, 1);
        for (var k = 0; k < sims; k++) {
            data[k][m] = data[k][m - 1] * (1 + rates[k]/100)
            data[k][m] += (income - spend)
        }
    }
    return data;
}
