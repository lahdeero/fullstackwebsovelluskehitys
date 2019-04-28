import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  it('they both think its ok', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    const newState2 = counterReducer(newState, action)
    expect(newState2).toEqual({
      good: 0,
      ok: 2,
      bad: 0
    })
  })
  it('it goes to zero', () => {
    const action = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'ZERO'
    }
    const state = initialState
    deepFreeze(state)
    let newState = counterReducer(state, action)
    newState = counterReducer(newState, action)
    // console.log('newstate good = ', newState.good)
    newState = counterReducer(newState, action2)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
