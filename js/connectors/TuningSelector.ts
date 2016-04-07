var connect = require('react-redux').connect
import { setTuning } from '../actions'

import Tuning_ from '../components/Tuning'
import DropdownSelector from '../components/DropdownSelector'

const mapStateToProps = (state) => {
  return {
    currentOption: state.tuning,
    options: state.tunings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      dispatch(setTuning(id))
    }
  }
}


export const TuningSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownSelector)

export const Tuning = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tuning_)
