var connect = require('react-redux').connect

// import {connect} from 'react-redux'
import { setKey } from '../actions'
import RadioButtonSelector, { RadioButtonSelectorState, RadioButtonSelectorDispatch, Button} from '../components/RadioButtonSelector'



let mapStateToProps : (state : any) => RadioButtonSelectorState = function (state) {
  return {
    selectedButton: state.key,
    buttons: state.keys
  }
}

let mapDispatchToProps : (dispatch : any) => RadioButtonSelectorDispatch = function (dispatch) {
  return {
    onButtonSelect: (id) => {
      dispatch(setKey(id))
    }
  }
}

export const KeySelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioButtonSelector)
