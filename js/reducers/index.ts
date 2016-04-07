import { combineReducers } from 'redux'
import tuning from './tuning'
import tunings from './tunings'
import key from './key'
import keys from './keys'
import scale from './scale'
import scales from './scales'
import viewhints from './viewhints'

const explorerApp = combineReducers({
  tuning,
  tunings,
  key,
  keys,
  scale,
  scales,
  viewhints
})

export default explorerApp
