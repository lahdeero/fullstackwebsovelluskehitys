import React from 'react'

const Country = ({ country, handleClick }) => {
  return (
    <div key={country.alpha3Code} onClick={handleClick(country.name)} >
      {country.name} 
    </div>
  )
}

export default Country
