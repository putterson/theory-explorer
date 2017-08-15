import * as types from './ActionTypes'

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

export const selectNote = (id) => {
  return { type : types.SELECT_NOTE, id: id}
}

export const toggleSelectNote = (id, selected) => {
  if(selected === true) {
    return { type : types.UNSELECT_NOTE, id: id }
  } else {
    return { type : types.SELECT_NOTE, id: id }
  }
}