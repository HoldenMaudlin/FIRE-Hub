export function User(age, assets, income, incomeGrowth, spend, target, stockAlloc, bondAlloc, cashAlloc) {
    this.age = age;
    this.assets = assets;
    this.income = income;
    this.incomeGrowth = incomeGrowth;
    this.spend = spend;
    this.target = target;
    this.stockAlloc = stockAlloc;
    this.bondAlloc = bondAlloc;
    this.cashAlloc = cashAlloc;
}

const UserAgeKey = 'UserAgeKey'
const UserAssetKey = 'UserAssetKey'
const UserIncomeKey = 'UserIncomeKey'
const UserGrowthKey = 'UserGrowthKey'
const UserSpendKey = 'UserSpendKey'
const UserTargetKey = 'UserTargetKey'
const UserStockAllocKey = 'UserStockAllocKey'
const UserBondAllocKey = 'UserBondAllocKey'
const UserCashAllocKey = 'UserCashAllocKey'

export var UserKeys = {
    age: { stateKey: 'age', asyncKey: UserAgeKey },
    assets: { stateKey: 'assets', asyncKey: UserAssetKey },
    income: { stateKey: 'income', asyncKey: UserIncomeKey, },
    spend: { stateKey: 'spend', asyncKey: UserSpendKey },
    target: { stateKey: 'target', asyncKey: UserTargetKey },
    incomeGrowth: { stateKey: 'incomeGrowth', asyncKey: UserGrowthKey },
    stocks: { stateKey: 'stocks', asyncKey: UserStockAllocKey },
    bonds: { stateKey: 'bonds', asyncKey: UserBondAllocKey },
    cash: { stateKey: 'cash', asyncKey: UserCashAllocKey },
}