import * as types from '../constants/ActionTypes'

export const setTuning = (name) => {
  return { type: types.SET_TUNING, name: name}
}

export const setKey = (id) => {
  return { type: types.SET_KEY, id: id}
}

export const setChord = (id) => {
  return { type: types.SET_CHORD, id: id}
}

export const setScale = (id) => {
  return { type: types.SET_SCALE, id: id}
}

export const setMode = (mode) => {
  return { type: types.SET_MODE, mode: mode}
}