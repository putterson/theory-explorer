import { connect } from 'react-redux'
import { setTuning } from '../actions'

import Tuning_ from '../components/Tuning'
import TuningSelector_ from '../components/TuningSelector'

const mapStateToProps = (state) => {
  return {
    currentTuning: state.tuning,
    tunings: state.tunings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTuningSelect: (id) => {
      dispatch(setTuning(id))
    }
  }
}


export const TuningSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TuningSelector_)

export const Tuning = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tuning_)
