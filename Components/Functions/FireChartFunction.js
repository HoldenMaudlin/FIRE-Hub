import { _stringToInt } from './ParseNumber'

// Basic Fire Function
export function _createFireGraph( age, assets, income, spend, target ) {
    // Convert inputs from strings to numbers
    if (age !== undefined) { age = _stringToInt(age) };
    if (spend !== undefined) { spend = _stringToInt(spend) };
    if (assets !== undefined) { assets = _stringToInt(assets) };
    if (income !== undefined) { income = _stringToInt(income) };
    if (target !== undefined) { target = _stringToInt(target) };

    var principal = assets;
    var savings = assets;
    var data = [];

    // Until target is reached, grow portfolio
    while ( savings < target ) {
        principal += ( income - spend );
        savings *= 1.07;
        savings += ( income - spend );
        var node = {
            age: age,
            principal: principal,
            total: ( savings )
        }
        data.push(node);
        age++;
    }
    return data;
}


// Advanced Fire Function
export function _createAdvancedFireGraph( age, assets, income, spend, target, incomeGrowth, 
stockAlloc, bondAlloc, cashAlloc, stockReturns, bondReturns) {
    // Convert inputs from strings to numbers
    if (age !== undefined) { age = _stringToInt(age) };
    if (spend !== undefined) { spend = _stringToInt(spend) };
    if (assets !== undefined) { assets = _stringToInt(assets) };
    if (income !== undefined) { income = _stringToInt(income) };
    if (incomeGrowth !== undefined) { incomeGrowth = parseFloat(incomeGrowth) };
    if (target !== undefined) { target = _stringToInt(target) };
    if (stockAlloc !== undefined) { stockAlloc = _stringToInt(stockAlloc) };
    if (bondAlloc !== undefined) { bondAlloc = _stringToInt(bondAlloc) };
    if (cashAlloc !== undefined) { cashAlloc = _stringToInt(cashAlloc) };
    if (stockReturns !== undefined) { stockReturns = parseFloat(stockReturns) };
    if (bondReturns !== undefined) { bondReturns = parseFloat(bondReturns) };
    
    // Declare additonal varialbes
    var bondSavings = assets * bondAlloc / 100;
    var stockSavings = assets * stockAlloc / 100;
    var cashSavings = assets * cashAlloc / 100;
    var savings = assets;
    var principal = assets;
    var data = [];

    // Until target is reached, iterate the portfolio, apply growth and savings
    while (savings < target) {
        bondSavings *= ( 1 + bondReturns/100 );
        stockSavings *= ( 1 + stockReturns/100 );
        principal += income - spend;
        savings = bondSavings + stockSavings + cashSavings;
        var node = {
            age: age,
            principal: principal,
            savings: savings,
        }
        data.push(node)
        income *= ( 1 + incomeGrowth/100 )
        bondSavings += ( income  - spend ) * bondAlloc/100;
        bondSavings *= ( 1 + bondReturns/100 )
        stockSavings += ( income - spend ) * stockAlloc/100;
        stockSavings *= ( 1 + stockReturns/100 )
        cashSavings += ( income - spend ) * cashAlloc/100;
        age++;
    }
    return data;
}

// Break even function to determine when one investment will surpass another
export function _createInvestment1Line(amount, returns1, fees1, returns2, fees2, taxes) {
    // Convert inputs from strings to numbers
    if (amount !== undefined) { amount = _stringToInt(amount) };
    if (returns1 !== undefined) { returns1 = parseFloat(returns1) };
    if (fees1 !== undefined) { fees1 = parseFloat(fees1) };
    if (returns2 !== undefined) { returns2 = parseFloat(returns2) };
    if (fees2 !== undefined) { fees2 = parseFloat(fees2) };
    if (taxes !== undefined) { taxes = parseFloat(taxes) };

    taxes /= 100
    returns1 = 1 + (returns1 - fees1)/100
    returns2 = 1 + (returns2 - fees2)/100

    var amount1 = amount
    var amount2 = amount - ( amount * taxes )
    var i = 0;
    var data = []
    var node = {
        yrs: i,
        cur: amount1,
        pot: amount2,
    }

    while ( amount1 > amount2 ) {
        i++
        amount1 *= returns1
        amount2 *= returns2
        var node = {
            yrs: i,
            cur: amount1,
            pot: amount2,
        }
        data.push(node)
    }
    return data
}
