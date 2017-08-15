import { combineReducers, createStore } from 'redux'
import tuning from './tuning'
import tunings from './tunings'
import key from './key'
import keys from './keys'
import scale from './scale'
import scales from './scales'
import viewhints from './viewhints'
import mode from './mode'
import selectednotes from './selectednotes'

const explorerApp = combineReducers({
  tuning,
  tunings,
  key,
  keys,
  scale,
  scales,
  viewhints,
  mode,
  selectednotes,
})

export default explorerApp
