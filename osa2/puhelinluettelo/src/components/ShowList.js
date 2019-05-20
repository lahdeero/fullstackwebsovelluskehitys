import React from 'react'

const Persons = (props) => {
  const personsToShow = props.persons.filter(person => person.name.includes(props.filter))

  return (
    <div>
      {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </div>
  )
}


export default Persons
