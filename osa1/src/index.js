import React from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    return (
        <table>
        <tbody>
        <tr>
        <td colSpan="2"><h1>Statistiikka</h1></td>
        </tr>
            <Statistic nimi="hyvä" arvo={props.hyva}/>
            <Statistic nimi="neutraali" arvo={props.neutraali}/>
            <Statistic nimi="huono" arvo={props.huono}/>
            <Statistic nimi="Keskiarvo" arvo={props.keskiarvo} />
            <Statistic nimi="Positiivisia" arvo={props.positiivisia} />
        </tbody>
        </table>
    )
}
const Statistic = (props) => {
    return (
        <tr>
        <td> {props.nimi} </td>
        <td> {props.arvo} </td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    asetaArvoon(apu, arvo) {
        let newState = {}
        newState[apu] = arvo
        return () => this.setState(newState)
    }

    keskiarvo() {
        let x = (this.state.hyva * 1 + this.state.neutraali * 0 + this.state.huono * -1) / (this.state.hyva + this.state.huono + this.state.neutraali)
        let k = x.toFixed(1)
        if (isNaN(k)) return 0
        return k
    }
    positiivisia() {
        let k = this.state.hyva + this.state.neutraali + this.state.huono
        let t = this.state.hyva / k * 100
        if (isNaN(t)) return 0 + " %"
        return t.toFixed(0) + " %";
    }
    palautteita() {
        let k = this.state.hyva + this.state.neutraali + this.state.huono
        if (isNaN(k) || k === 0) return false
        return true
    }
    doStats() {
        return (
            <div>
            <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} 
            keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()} />
            </div>
        )
    }

    render() {
        const onkoPalautetta = this.palautteita();
      return (
        <div>
          <h1>Anna palautetta</h1>
          <div>
            <Button handleClick={this.asetaArvoon("hyva", this.state.hyva + 1) } text="Hyvä" />
            <Button handleClick={this.asetaArvoon("neutraali", this.state.neutraali + 1) } text="Neutraali" />
            <Button handleClick={this.asetaArvoon("huono", this.state.huono + 1) } text="Huono" />
            {onkoPalautetta ? ( this.doStats() ) : ( <p>Ei yhtään palautetta annettu</p> )}
          </div>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)