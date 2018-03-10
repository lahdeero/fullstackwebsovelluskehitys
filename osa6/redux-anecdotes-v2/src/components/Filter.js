import React from 'react'
import PropTypes from 'prop-types'
import { actionForFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (event) => {
    event.preventDefault()
    store: PropTypes.object
    const filter = event.target.value
    this.context.store.dispatch(
      actionForFilter.setFilter(filter)
    )
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

Filter.contextTypes = {
  store: PropTypes.object
}
export default Filter
