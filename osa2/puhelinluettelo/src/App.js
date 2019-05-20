import React from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      message: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    }
    let found = false;
    let found_id = 0;
    let oldnumber = 0;
    
    for (let i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name === this.state.newName) {
        found = true
        found_id = this.state.persons[i].id
        oldnumber = this.state.persons[i].number
        break;
      }
    }
    console.log(found);
    console.log(found_id);
    if(found) {
      if (!window.confirm(`'${this.state.newName}' on jo luettelossa, korvataanko vanha numero uudella?`)) return
      personService 
        .update(found_id, personObject)
        .then(response => {
          this.setState({
            message: `Vaihdettiin '${personObject.name}' numeroa`,
            persons: this.state.persons.filter(e => !e.number.includes(oldnumber)).concat(response),
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        })
        .catch(error => {
          alert(`Henkilö '${personObject.name}' on jo poistettu palvelimelta!`)
          this.setState({ persons: this.state.persons.filter(n => n.id !== found_id) })
        })
    } else {
      personService
        .create(personObject) 
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            message: `Lisättiin '${personObject.name}' luetteloon`,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        })
    }
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
            message: `Poistettiin '${person.name}' luettelosta`,
            persons: this.state.persons.filter(e => !e.name.includes(person.name))
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        })
        .catch(error => {
          alert(`Henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`)
          this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
        })
    }
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          <Notification message={this.state.message} />
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

