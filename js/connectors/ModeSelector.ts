var connect = require('react-redux').connect

// import {connect} from 'react-redux'
import { setMode } from '../actions'
import { AppMode } from '../reducers/mode'
import RadioButtonSelector, { RadioButtonSelectorState, RadioButtonSelectorDispatch, Button } from '../components/RadioButtonSelector'



let mapStateToProps: (state: any) => RadioButtonSelectorState = function (state) {
  return {
    selectedButton: AppMode[state.mode],
    buttons: Object
      .keys(AppMode)
      .filter(key => isNaN(parseInt(key, 10))) // Only take the string keys, not the numeric value ones
      .map((appmode) => { return { name: appmode, id: AppMode[appmode] } })
  }
}

let mapDispatchToProps: (dispatch: any) => RadioButtonSelectorDispatch = function (dispatch) {
  return {
    onButtonSelect: (mode) => {
      dispatch(setMode(mode))
    }
  }
}

export const ModeSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioButtonSelector)
