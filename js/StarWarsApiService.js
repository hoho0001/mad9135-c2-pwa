class StarWarsApiService {

  constructor() {
    // this.baseUrl = 'https://swapi.co/api'
    this.baseUrl = 'https://api.octranspo1.com/v1.3/GetNextTripsForStopAllRoutes?appID=b76ebb55&apiKey=785bccd8ab33402a78a6b4442f110073&stopNo=0706&format=json'
    this.options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Credentials': true,
        'mode': 'cors',
        'origin': '*',
        'method': 'GET',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  }

  async fetchJson(uri, options = {}) {
    try {
      // const response = await fetch(`${this.baseUrl}${uri}`, { ...this.options, ...options }) //merge two objects
      const response = await fetch(this.baseUrl) //merge two objects
      if (response.ok) {
        const jason = response.json()
        return await jason.GetRouteSummaryForStopResult
      }
      return Promise.reject(`${response.status}: ${response.statusText}`)
    } catch (err) {
      return Promise.reject('The fetch request failed ' + err)
    }
  }

  async getPeople() {
    // return this.fetchJson(`/people/`)
    return this.fetchJson(``)
  }
}
