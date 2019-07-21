import React, { useState } from 'react'
import { Query } from 'react-apollo'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  if (!props.show) {
    return null
  }

  const handleClick = (item) => {
    setFilter(item)
  }

  return (
    <Query query={props.ALL_BOOKS} onError={props.handleError}>
      {(result) => {
        if (result.loading) {
          return <div>Loading..</div>
        }
        const genres = [...new Set(result.data.allBooks.filter(b => b.genres[0]).map(b => b.genres[0]))]
        const books = filter ? result.data.allBooks.filter(b => {
          return b.genres.includes(filter)
        }) : result.data.allBooks
        return (
          <div>
            <h2>books</h2>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>
                    author
                  </th>
                  <th>
                    published
                  </th>
                </tr>
                {books.map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <ul>
              {genres.map(g =>
                g === filter ?
                  <button key={g} style={{ color: 'red' }} onClick={() => handleClick(g)}>{g}</button> :
                  <button key={g} onClick={() => handleClick(g)}>{g}</button>
              )}
              {filter === '' && <button style={{ color: 'red' }} onClick={() => handleClick('')}>{'all genres'}</button>}
              {filter !== '' && <button onClick={() => handleClick('')}>{'all genres'}</button>}
            </ul>
          </div>
        )
      }}
    </Query>
  )
}

export default Books