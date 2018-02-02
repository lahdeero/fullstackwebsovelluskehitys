import React from 'react'
import Person from './components/Person'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    persons: [],
    newName: '',
    newNumber: '',
    filter: '',
    error: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      visible: true
    }
    let found = false;
    for (let i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name === this.state.newName) {
        found = true;
        break;
      }
    }
    console.log(found);
    if (found) {
      alert("Onjo listalla")
      return
    }

    personService
      .create(personObject) 
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      })
  }

  handleNewName = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumber = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  deletePerson = (id) => {
    return () => {
      const person = this.state.persons.find(n => n.id === id)
      if (!window.confirm(`Poistetaanko '${person.name}' palvelimelta`)) return

      personService
        .erase(id)
        .then(res => {
          this.setState({
            persons: this.state.persons.filter(e => !e.name.includes(person.name))
          })
        })
        .catch(error => {
          this.setState({
          error: `Henkilö '${person.name}' on jo poistettu palvelimelta`
        })
      setTimeout(() => {
        this.setState({ error: null })
      }, 50000)
     })

    }
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.includes(this.state.filter))
    return (
      <div>
        <div>
          debug: {this.state.filter}
        </div>
        <h2>Puhelinluettelo</h2>
        <div>
          Rajaa näytettäviä:
          <input value={this.state.filter} onChange={this.handleFilter} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:
            <input 
              value={this.state.newName} 
              onChange={this.handleNewName}
            />
          </div>
          <div>
            numero:
            <input
              value={this.state.newNumber}
              onChange={this.handleNumber}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>   
        <div>
          <ul>
            {personsToShow.map(person =>
              <Person key={person.id}
                person={person}
                deletePerson={this.deletePerson(person.id)}
              />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default App

