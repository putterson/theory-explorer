import { combineReducers } from 'redux'
import tuning from './tuning'
import tunings from './tunings'
import key from './key'
import keys from './keys'
import viewhints from './viewhints'

const explorerApp = combineReducers({
  tuning,
  tunings,
  key,
  keys,
  viewhints
})

export default explorerApp
