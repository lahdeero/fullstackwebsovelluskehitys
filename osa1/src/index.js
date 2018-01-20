import React from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    return (
        <div>
            <h1>Statistiikka</h1>
            <Statistic nimi="hyvä" arvo={props.hyva}/>
            <Statistic nimi="neutraali" arvo={props.neutraali}/>
            <Statistic nimi="huono" arvo={props.huono}/>
        </div>
    )
}
const Statistic = (props) => {
    return (
        <div>
            {props.nimi} {props.arvo}
        </div>
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

    asetaHyvaArvoon = (arvo) => () => this.setState({ hyva: arvo })
    asetaNeutraaliArvoon = (arvo) => () => this.setState({ neutraali: arvo })
    asetaHuonoArvoon = (arvo) => () => this.setState({ huono: arvo })

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

    render() {
    if (this.palautteita() === false) {
        return (
        <div>
          <h1>Anna palautetta</h1>
          <div>
            <Button handleClick={this.asetaHyvaArvoon(this.state.hyva + 1) } text="Hyvä" />
            <Button handleClick={this.asetaNeutraaliArvoon(this.state.neutraali + 1) } text="Neutraali" />
            <Button handleClick={this.asetaHuonoArvoon(this.state.huono + 1) } text="Huono" />
            <h1>statistiikka</h1>
            <p>Ei yhtään palautetta annettu</p>
          </div>
        </div>
        )
    }
      return (
        <div>
          <h1>Anna palautetta</h1>
          <div>
            <Button handleClick={this.asetaHyvaArvoon(this.state.hyva + 1) } text="Hyvä" />
            <Button handleClick={this.asetaNeutraaliArvoon(this.state.neutraali + 1) } text="Neutraali" />
            <Button handleClick={this.asetaHuonoArvoon(this.state.huono + 1) } text="Huono" />
            <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}/>
            <Statistic nimi="Keskiarvo" arvo={this.keskiarvo()} />
            <Statistic nimi="Positiivisia" arvo={this.positiivisia()} />
          </div>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)