import { connect } from 'react-redux'
import { setTuning } from '../actions'

import Tuning from '../components/Tuning'
import TuningSelector from '../components/TuningSelector'

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


const TuningContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TuningSelector)

export default TuningContainer
