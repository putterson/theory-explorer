import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ExplorerActions from '../actions'
import Fretboard from '../components/Fretboard'
import TuningContainer from '../containers/TuningContainer'
import Board from '../stores/Board'

import _ from 'lodash'

const App = () => (
    <div>
    <TuningContainer/>
    <Fretboard/>
    </div>
)

export default App

// let App = React.createClass({
//   getInitialState() {
//     var default_tuning = Board.getDefaultTuning();
//     return {
//       viewhints: { fret_start: 0,
// 		   fret_end: 22 },
//       tuning: default_tuning,
//       tunings: Board.getTunings(),
//       strings: Board.getStrings(default_tuning),
//       frets: Board.getFrets(0,24),
//       fretmarkers: Board.getFretMarkers(0,24)
//     };
//   },

//   componentDidMount() {
//     window.addEventListener('resize', this.handleResize);
//   },

//   handleResize() {
//     this.setAppState(this.state);
//   },

//   setAppState(partialState, callback) {
//     return this.setState(partialState, callback);
//   },

//   setTuning(tuning) {
//     this.state.tuning = tuning;
//     this.state.strings = Board.getStrings(tuning);
//     this.setState(this.state);
//   },


//   render() {
//     return (
// 	<div> 
// 	<div> 

//       </div>
// 	<div> 
// 	<TuningContainer/>
// 	</div>
// 	<Fretboard
//       appState={this.state}
//       setAppState={this.setAppState} />
// 	</div>
//     )
//   }
// });

// function mapStateToProps(state) {
//   return {
//     todos: state.todos
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(ExplorerActions, dispatch)
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);


