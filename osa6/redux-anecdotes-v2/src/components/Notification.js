import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Notification extends React.Component {
  static propTypes = {
    notification: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ])
  }
  render () {
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

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
