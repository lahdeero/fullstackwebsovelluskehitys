import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  return(
    <div>
      <Otsikko kurssi={props.kurssi} />
      {props.kurssi.osat.map(osa=><Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
      <Yhteensa kurssi={props.kurssi} />
    </div>
  )
}
const Yhteensa = (props) => {
  let totalAmount = props.kurssi.osat.reduce(function(summa, osa) {
    return summa + osa.tehtavia
  }, 0)

  return(
    <p>Yhteensä {totalAmount} tehtävää</p>
  )
}
const Kurssi = (props) => {
    return (
      <div>
        {props.kurssit.map(kurssi=><Sisalto key={kurssi.id} kurssi={kurssi} /> )}
      </div>
    )
}

export default Kurssi
