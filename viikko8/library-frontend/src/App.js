import { gql } from 'apollo-boost'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Mutation, useMutation, Query, useApolloClient, useSubscription } from 'react-apollo'
import { LOGIN, ME, ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('useEffect')
    if (localStorage.getItem('lbToken')) {
      setToken(localStorage.getItem('lbToken'))
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const handleError = (error) => {
    const errorMessage = error.graphQLErrors[0] ? error.graphQLErrors[0].message : 'Unknown error'
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  return (
    <div>
      <div style={{ display: 'inline' }}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token &&
          <Query query={ME}>
            {(result) => {
              if (result.loading) {
                return <div style={{ display: 'inline' }}>Loading..</div>
              }
              return (
                <div style={{ display: 'inline' }}>
                  <button onClick={() => setPage('add')}>add book</button>
                  <button onClick={() => setPage('recommend')}>recommend</button>
                  {`${result.data.me.username}`}
                  <button onClick={() => logout()}>logout</button>
                </div>
              )
            }}
          </Query>}
      </div>

      {errorNotification()}

      <Authors
        show={page === 'authors'} ALL_AUTHORS={ALL_AUTHORS}
        handleError={(error) => handleError(error)}
      />

      <Books
        show={page === 'books'} ALL_BOOKS={ALL_BOOKS}
      />

      <Recommend
        show={page === 'recommend'} ME={ME}
      />

      <Mutation mutation={CREATE_BOOK} onError={handleError} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(addBook) =>
          <NewBook
            show={page === 'add'}
            addBook={addBook}
            handleError={(error) => handleError(error)}
          />
        }
      </Mutation>

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        setPage={setPage}
        client={client}
      />

    </div>
  )
}

export default App
