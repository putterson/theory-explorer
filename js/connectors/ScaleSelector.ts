var connect = require('react-redux').connect
import { setScale } from '../actions'

import DropdownSelector from '../components/DropdownSelector'

const mapStateToProps = (state) => {
  return {
    currentOption: state.scale,
    options: state.scales
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      dispatch(setScale(id))
    }
  }
}


export const ScaleSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownSelector)
