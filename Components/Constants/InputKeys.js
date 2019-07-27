// Tool 1 Keys
export const T1AgeKey = 'T1AgeKey'
export const incomeKey = 'T1IncomeKey'
export const spendKey = 'T1SpendingKey'
export const targetKey = 'T1RetirementKey'
export const assetKey = 'T1AssetKey'
export const rateKey = 'T1RateKey'

// Tool 2 Keys
export const T2AmountKey = 't2inputAmountKey'
export const T2Inv1ReturnKey = 't2inputInv1ReturnKey'
export const T2Inv1FeeKey = 't2inputInv1FeeKey'
export const T2TaxKey = 't2inputTaxKey'
export const T2Inv2ReturnKey = 't2inputInv2ReturnKey'
export const T2Inv2FeeKey = 't2inputInv2FeeKey'

// Tool 3 Keys
export const T3AgeKey = 'T3AgeStorageKey'
export const T3IncomeKey = 'T3IncomeKey'
export const T3SpendKey = 'T3SpendKey'
export const T3AssetKey = 'T3AssetKey'
export const T3TargetKey = 'T3TargetKey'
export const T3IncomeGrowthKey = 'T3IncomeGrowthKey'
export const T3StockAllocKey = 'T3StockAllocKey'
export const T3BondAllocKey = 'T3BondAllocKey'
export const T3CashAllocKey = 'T3CashAllocKey'
export const T3StockReturnKey = 'T3StockReturnKey'
export const T3BondReturnKey = 'T3BondReturnKey'

// Monte Carlo Keys
export const MCIncomeKey = 'MCIncomeKey'
export const MCAssetsKey = 'MCAssetsKey'
export const MCSpendKey = 'MCSpendKey'
export const MCReturnsKey = 'MCReturnsKey'
export const MCSimsKey = 'MCSimsKey'
export const MCLengthKey = 'MCLengthKey'

// Advanced Fire Dictionary
export var AFstateKeys = [
    { stateKey: 'age', asyncKey: T3AgeKey },
    { stateKey: 'income', asyncKey: T3IncomeKey, },
    { stateKey: 'spend', asyncKey: T3SpendKey },
    { stateKey: 'target', asyncKey: T3TargetKey },
    { stateKey: 'assets', asyncKey: T3AssetKey },
    { stateKey: 'incomeGrowth', asyncKey: T3IncomeGrowthKey },
    { stateKey: 'stocks', asyncKey: T3StockAllocKey },
    { stateKey: 'bonds', asyncKey: T3BondAllocKey },
    { stateKey: 'cash', asyncKey: T3CashAllocKey },
    { stateKey: 'stockReturns', asyncKey: T3StockReturnKey },
    { stateKey: 'bondReturns', asyncKey: T3BondReturnKey }
]

// Break Even Dictionary
export var BEstateKeys = [
    { stateKey: 'amount', asyncKey: T2AmountKey },
    { stateKey: 'returns1', asyncKey: T2Inv1ReturnKey },
    { stateKey: 'fees1', asyncKey: T2Inv1FeeKey }, 
    { stateKey: 'returns2', asyncKey: T2Inv2ReturnKey },
    { stateKey: 'fees2', asyncKey: T2Inv2FeeKey },
    { stateKey: 'taxes', asyncKey: T2TaxKey },
]

// Basic Fire Dictionary
export var BFstateKeys = [
    { stateKey: 'age', asyncKey: T1AgeKey },
    { stateKey: 'income', asyncKey: incomeKey },
    { stateKey: 'target', asyncKey: targetKey },
    { stateKey: 'assets', asyncKey: assetKey },
    { stateKey: 'spend', asyncKey: spendKey },
]

// Monte Carlo Dictionary
export var MCstateKeys = [
    { stateKey: 'income', asyncKey: MCIncomeKey },
    { stateKey: 'assets', asyncKey: MCAssetsKey },
    { stateKey: 'spend', asyncKey: MCSpendKey },
    { stateKey: 'returns', asyncKey: MCReturnsKey },
    { stateKey: 'sims', asyncKey: MCSimsKey },
    { stateKey: 'length', asyncKey: MCLengthKey },
]