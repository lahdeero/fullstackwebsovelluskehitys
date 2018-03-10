import React from 'react'
import { connect } from 'react-redux'
import { actionForFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    this.props.actionForFilter(filter)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        <br />
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    filter: store.filter
  }
}
const mapDispatchToProps = {
  actionForFilter
}
const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps 
)(Filter)

export default ConnectedFilter
