class StarWarsApiService {

  constructor () {
    this.baseUrl = 'https://swapi.co/api'
    this.options = {
      headers: {
        'Accept': 'application/json; charset=utf-8'
      }
    }
  }

  async fetchJson (uri, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, { ...this.options, ...options }) //merge two objects
      if (response.ok) {
        return await response.json()
      }
      return Promise.reject(`${response.status}: ${response.statusText}`)
    } catch (err) { 
      return Promise.reject('The fetch request failed ' + err)
    }
  }

  async getPerson (id) {
    return this.fetchJson(`/people/${id}/`)
  }

  async getPeople () {
    return this.fetchJson(`/people/`)
  }
}
