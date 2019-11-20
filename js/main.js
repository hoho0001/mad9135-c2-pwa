
const app = {
  init() {
    // this.personInput = document.getElementById('personId')
    this.personOutput = document.getElementById('result')
    // this.personInput.addEventListener('change', this.getPerson)
    this.getPeople()

  },

  showResult(text) {
    this.personOutput.innerText = text
  },

  showList(routes) {
    const list = routes.map(route => {
      return {
        destination: route.GetRouteSummaryForStopResult.Routes.Route.Trips.Trip.TripDestination,
        sttime: route.GetRouteSummaryForStopResult.Routes.Route.Trips.Trip.TripStartTime,
        lat: route.GetRouteSummaryForStopResult.Routes.Route.Trips.Trip.Latitude
      }
    })

    const target = document.getElementById('result')
    const ul = document.createElement('ul')
    document.createElement('li').innerHTML = `Stop #: ${routes.GetRouteSummaryForStopResult.StopNo}`
    document.createElement('li').innerHTML = `Stop Description: ${routes.GetRouteSummaryForStopResult.StopDescription}`
    document.createElement('li').innerHTML = `Route #: ${routes.GetRouteSummaryForStopResult.Routes.Route.RouteNo}`
    list.forEach(route => {
      const li = document.createElement('li')
      li.innerHTML = `Destination: ${route.destination}; Start Time: <strong>${route.sttime}</strong>
      <em> (Latitude ${route.lat})</em>`
      ul.appendChild(li)
    });
    target.appendChild(ul)

  },

  getPeople() {
    const swapi = new StarWarsApiService()
    swapi
      .getPeople()
      .then(routes => app.showList(routes))
      .catch(error => app.showResult('Problem accessing external resource ' + error))
  },

}

document.addEventListener('DOMContentLoaded', event => app.init(), false)