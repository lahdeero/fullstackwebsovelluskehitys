import { gql } from 'apollo-boost'

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ME = gql`
{
  me {
    username
  }
}
`

export const RECOMMEND = gql`
{
  me {
    username
    favoriteGenre
  }
  allBooks {
    title
    author {name}
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {name}
    published
    genres
  }
}
`
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {name}
    id
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author {
    name
    born
  }
  genres
  id
}`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`

export default { LOGIN, ME, ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, BOOK_ADDED }