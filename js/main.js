
const app = {
  init () {
    // this.personInput = document.getElementById('personId')
    this.personOutput = document.getElementById('result')
    // this.personInput.addEventListener('change', this.getPerson)
    this.getPeople()

  },

  showResult (text) {
    this.personOutput.innerText = text
  },

  showList (people){
    const list = people.map(person => {
      return {
        name: person.name,
        height: person.height,
        birth_year: person.birth_year
      }
    })
 
    const target = document.getElementById('result')
    const ul = document.createElement('ul')
    list.forEach(person => {
      const li = document.createElement('li')
      li.innerHTML = `Name: ${person.name}; Heigth: <strong>${person.height} cm</strong>
      <em> (Birth year ${person.birth_year})</em>`
      ul.appendChild(li)
    });
    target.appendChild(ul)
    
  },

  getPeople () {
    const swapi = new StarWarsApiService ()
    swapi
    .getPeople()
    .then(people =>  app.showList((people.results)) )
    .catch(error => app.showResult('Problem accessing external resource ' + error))
  },

  getPerson () {
    if (app.personInput.value > 0) {
      const swapi = new StarWarsApiService ()
    swapi
    .getPerson(app.personInput.value)
    .then(person => app.showResult(JSON.stringify({person}, null, 2)))
    .catch(error => app.showResult('Problem accessing external resource ' + error))
    }
    else {
      app.showResult('Here are the list of 10 people: ')
      app.getPeople()
    }
  }
}

document.addEventListener('DOMContentLoaded', event => app.init(), false)