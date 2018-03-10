import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content: content, id: getId(), votes:0 })
  console.log(response.data)
  return response.data
}

const vote = async (id, newAnecdote) => {
  const request = axios.put(`${baseUrl}/${id}`, newAnecdote)
  return request.then(response => response.data)
}

export default { getAll, createNew, vote }
