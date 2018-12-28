
AsyncStorage.getItem(T1AgeKey).then((age) => {
    age = parseInt(age, 10)
    this.setState({age: age})
  })
  AsyncStorage.getItem(incomeKey).then((income) => {
    income = parseInt(income, 10)
    this.setState({income: income})
  })
  AsyncStorage.getItem(spendKey).then((spend) => {
    spend = parseInt(spend,10)
    this.setState({spend: spend})
  })
  AsyncStorage.getItem(targetKey).then((retireSpend) => {
    retireSpend = parseInt(retireSpend, 10) 
    this.setState({retireSpend: retireSpend})
  })
  AsyncStorage.getItem(rateKey).then((rate) => {
    rate = parseInt(rate, 10)
    this.setState({rate: rate})
  })
  AsyncStorage.getItem(assetKey).then((assets) => {
    assets = parseInt(assets, 10)
    this.setState({assets: assets})
  })
  var data1 = this._createFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.retireSpend, this.state.rate)