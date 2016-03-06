import * as types from '../constants/ActionTypes'

export const setTuning = (name) => {
  return { type: types.SET_TUNING, name: name}
}
