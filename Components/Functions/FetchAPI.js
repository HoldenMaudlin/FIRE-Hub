/*
@param   string    url          iTunes lookup url for the requested content
@param   string    stateKey     Key to bind fetched JSON data to the state of requesting component

@return  NONE
*/
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


// Switch pressed button to true and rest to false
export function _setState(stateKey){
  for (state in this.state) {
    if (this.state[state] === true && state !== 'mounted') {
      this.setState({[state]: false})
      this.setState({[stateKey]: true})
      break;
    }
  }
}

