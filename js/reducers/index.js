import { combineReducers } from 'redux'
import tuning from './tuning'
import tunings from './tunings'
import viewhints from './viewhints'

const explorerApp = combineReducers({
  tuning,
  tunings,
  viewhints
})

export default explorerApp
