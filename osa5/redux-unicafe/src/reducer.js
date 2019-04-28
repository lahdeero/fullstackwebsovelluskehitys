const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case 'GOOD':
      newState.good += 1
      return newState
    case 'OK':
      newState.ok += 1
      return newState
    case 'BAD':
      newState.bad += 1
      return newState
    case 'ZERO':
      const newState2 = Object.assign({}, initialState)
      return newState2
    default:
      return newState
  }
}

export default counterReducer