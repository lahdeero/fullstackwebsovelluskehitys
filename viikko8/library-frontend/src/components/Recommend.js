import React from 'react'
import { Query } from 'react-apollo'
import { RECOMMEND } from '../queries'

const Recommend = (props) => {
  if (!props.show) {
    return <div></div>
  }
  return (
    <div>
      <br />
      <h2>recommendations</h2>
      <Query query={RECOMMEND}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>
          }
          return (
            <div>
              books in your favorite genre <b>{`${data.me.favoriteGenre}`}</b>
              <br />
              <br />
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
                  {data.allBooks.filter(b => b.genres.includes(data.me.favoriteGenre)).map(b =>
                    <tr key={b.title}>
                      <td>{b.title}</td>
                      <td>{b.author.name}</td>
                      <td>{b.published}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        }
        }
      </Query>
    </div>
  )
}
export default Recommend