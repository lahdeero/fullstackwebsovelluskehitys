import React from 'react'

const Notification = ({ message, error }) => {
  if ((message === null || message === undefined) && (error === null || error === undefined)) {
    return null
  } else if ((message !== null && message !== undefined) && (error !== null && error !== undefined)) {
    console.log('message = ', message)
    console.log('error =', error)
    return (
      <div>
      <div className="error">
        {error}
      </div>
      <div className="notification">
        {message}
      </div>
    </div>
    )
  }

  if (error !== null && error !== undefined) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }

  if (message !== null && message !== undefined) {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  return null
}

export default Notification
