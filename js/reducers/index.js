import { combineReducers } from 'redux'
import tuning from './tuning'
import tunings from './tunings'
import frets from './frets'
import fretmarkers from './fretmarkers'
import viewhints from './viewhints'
import strings from './strings'

const explorerApp = combineReducers({
  tuning,
  tunings,
  frets,
  fretmarkers,
  viewhints,
  strings
})

export default explorerApp
