import { connect } from 'react-redux'
import { setKey } from '../actions'

import KeySelector from '../components/KeySelector'

const mapStateToProps = (state) => {
  return {
    currentKey: state.key,
    keys: state.keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onKeySelect: (id) => {
      dispatch(setKey(id))
    }
  }
}

export const KeyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeySelector)
