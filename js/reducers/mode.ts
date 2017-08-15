import * as types from '../actions/ActionTypes'

export enum AppMode {
    Scales,
    // Database,
    // Intervals,
    // Builder,
    Search
}

const mode = (state = AppMode.Search, action) => {
  switch(action.type) {
  case types.SET_MODE:
    return action.mode
  default:
    return state
  }
}

export default mode
