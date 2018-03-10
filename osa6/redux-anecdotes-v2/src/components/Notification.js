import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import reducer from '../reducers/notificationReducer'

class Notification extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    store: PropTypes.object
    const notification = this.props.notification
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    notification: store.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

Notification.contextTypes = {
  store: PropTypes.object
}
export default ConnectedNotification
