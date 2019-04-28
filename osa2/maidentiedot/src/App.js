import React from 'react';
import countryService from './services/countries'
import Country from './components/Country'

const ShowCountries = (props) => {
  console.log('filtteri', props.filter)
  if (props.countriesToShow.length > 10) {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  } else if (props.countriesToShow.length === 1) {
    const country = props.countriesToShow[0]
    return (
      <div>
        <h1>{country.name} {country.nativeName}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img width="300" height="200" alt={country.name} src={country.flag} />
      </div>
    )
  } else if (props.countriesToShow.length > 1) {
    for (let i = 0; i < props.countriesToShow.length; i++) {
      if (props.countriesToShow[i].name.toUpperCase() === props.filter.toUpperCase()) {
        const country = props.countriesToShow[i]
        return (
          <div>
            <h1>{country.name} {country.nativeName}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img width="300" height="200" alt={country.name} src={country.flag} />
          </div>
        ) 
      } 
    }
  }

  return (
        <div>
          <ul>
            {props.countriesToShow.map(country =>
              <Country key={country.alpha3Code}
                country={country} handleClick={props.handleClick}
              />)}
          </ul>
        </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    countryService
      .getAll()
      .then(response => {
        this.setState({countries: response})
      })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (filtteri) => () => {
      this.setState({
        filter: filtteri.toUpperCase()
      })
  }


  render() {
    const countriesToShow = this.state.countries.filter(country => country.name.toUpperCase().includes(this.state.filter.toUpperCase()))
      return (
        <div>
          find countries: 
          <input value={this.state.filter} onChange={this.handleFilter} />
          <ShowCountries countriesToShow={countriesToShow} handleClick={this.handleClick} filter={this.state.filter}/>
        </div>
    )
  }
}

export default App;
