var connect = require('react-redux').connect

// import {connect} from 'react-redux'
import { setKey } from '../actions'
import App from '../components/App'

let mapStateToProps = function (state) {
  return {
    mode: state.mode
  }
}

export const TheoryExplorerApp = connect(
  mapStateToProps
)(App)
