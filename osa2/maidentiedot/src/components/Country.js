import React from 'react'

const Country = ({ country, changeFilter }) => {
  return (
    <li>
      <div onClick={changeFilter}>
        {country.name}
      </div>
    </li>
  )
}

export default Country
