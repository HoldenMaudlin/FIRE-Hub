export function _fetchAPI(url, stateKey) {
    fetch (url)
    .then(res => {
      let resPass = res.json();
      return resPass
    })
    .then(data => {
      this.setState({       
        [stateKey]: data
      })
    })
    .catch( error => {
      console.error(error)
    })
  }