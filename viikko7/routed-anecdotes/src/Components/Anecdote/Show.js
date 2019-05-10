import React from 'react'

const Show = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>
        has {anecdote.votes} votes <br/><br />
        for more info see <a href={anecdote.info}>{anecdote.info}</a> <br /><br />
      </div>
    </div>
  )
}

export default Show