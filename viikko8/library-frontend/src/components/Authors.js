import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [authors, setAuthors] = useState([])

  if (!props.show) {
    return null
  }

  const submit = editAuthor => async (e) => {
    e.preventDefault()

    const res = await editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })

    console.log('resultti: ', res)

    setName('')
    setBorn('')
  }

  const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  } 
  `

  return (
    <div>
      <Query query={props.ALL_AUTHORS}>
        {({ data, loading }) => {
          setAuthors(data.allAuthors)
          if (loading) {
            return <div>Loading..</div>
          }
          return (
            <div>
              <h2>authors</h2>
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>
                      born
                    </th>
                    <th>
                      books
                    </th>
                  </tr>
                  {data.allAuthors.map(a =>
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td>{a.born}</td>
                      <td>{a.bookCount}</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          )
        }}
      </Query>

      <h2>Set birthyear</h2>
      <Mutation mutation={EDIT_AUTHOR} onError={props.handleError} refetchQueries={[{ query: props.ALL_AUTHORS }]}>
        {(editAuthor) => {
          return (
            <div>
              <form onSubmit={submit(editAuthor)}>
                {authors &&
                  <label>
                    <select onChange={({ target }) => setName(target.value)}>
                      {authors.map(author =>
                        <option key={author.name} value={author.name}>{author.name}</option>
                      )}
                    </select>
                  </label>
                }
                <div>
                  <div>
                    Born: <input value={born} onChange={({ target }) => setBorn(target.value)} />
                  </div>
                </div>
                <button type='submit'>update author</button>
              </form>
            </div>
          )
        }
        }
      </Mutation >
    </div >
  )
}

export default Authors