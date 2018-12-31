// Fetch iTunes api data and set state of component
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


// Function to pass to Genre Button component to set state of this screen
export function _setState(stateKey){
  for (state in this.state) {
    if (this.state[state] === true && state !== 'mounted') {
      this.setState({[state]: false})
      this.setState({[stateKey]: true})
      break;
    }
  }
}

