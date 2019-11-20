
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

  showList(people) {
    const list = people.map(person => {
      return {
        name: person.name,
        height: person.height,
        birth_year: person.birth_year
      }
    })

    const target = document.getElementById('result')
    const ul = document.createElement('ul')
    list.forEach(route => {
      const li = document.createElement('li')
      li.innerHTML = `Name: ${route.name}; Heigth: <strong>${route.height} cm</strong>
      <em> (Birth year ${route.birth_year})</em>`
      ul.appendChild(li)
    });
    target.appendChild(ul)

  },

  getPeople() {
    const swapi = new StarWarsApiService()
    swapi
      .getPeople()
      .then(routes => { console.log(routes); app.showList(routes.results) })
      .catch(error => app.showResult('Problem accessing external resource ' + error))
  },

}

document.addEventListener('DOMContentLoaded', event => app.init(), false)