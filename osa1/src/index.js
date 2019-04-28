import React from 'react'
import ReactDOM from 'react-dom'

const MostVoted = (props) => {
    let i = 0
    let isoinluku = 0
    let isoimmanindeksi = 0
    props.votes.forEach((luku) => {
        if (luku > isoinluku) {
            isoinluku = luku
            isoimmanindeksi = i
        }
        i++
    })
    if (isoinluku === 0) {
        return (
            <div>
            </div>
        )
    }
    return (
        <div>
        <h1>anecdote with most votes:</h1>
        {props.anecdotes[isoimmanindeksi]}
        <br />
        has {isoinluku} votes
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votet: Array(6).fill(0)
    }
  }
  setSelected = () => { 
        return () => {
            this.setState({ selected: this.generateRandom(6) })
        }
  }
  handleVote(i) {
      const votet = this.state.votet.slice()
      votet[i] = votet[i] + 1 
      return () => {
        this.setState({votet : votet})
      }
  }
  generateRandom(max) {
    return Math.floor((Math.random() * max) + 0);
  }
  
  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} 
        <br />
        <p>Votes: {this.state.votet[this.state.selected]} </p>
        <br />
        <button value="Next anecdote" onClick={this.setSelected()}>Next anecdote</button>
        <button value="Vote" onClick={this.handleVote(this.state.selected)}>Vote </button>
        <MostVoted anecdotes={this.props.anecdotes} votes={this.state.votet} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)