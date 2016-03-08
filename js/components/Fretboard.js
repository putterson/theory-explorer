import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import d3Fretboard from '../d3/d3Fretboard'
import visibleFretboardSelector from '../selectors/fretboardSelectors'

var fretboard = React.createClass({
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this)
    var dispatcher = d3Fretboard.create(el, this.props)
    window.addEventListener('resize', this.handleResize)
    this.dispatcher = dispatcher
  },

  handleResize(){
    var el = ReactDOM.findDOMNode(this)
    d3Fretboard.update(el, this.props, this.dispatcher)
  },

  componentDidUpdate: function(prevProps, prevState) {
    var el = ReactDOM.findDOMNode(this)
    d3Fretboard.update(el, this.props, this.dispatcher)
    
  },

  getFretboardState: function() {
    var appState = this.props.appState
    return _.assign({}, appState)
  },

  render: function() {
    return (
	<div className='Fretboard'></div>
    )
  }  
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Fretboard = connect(
  visibleFretboardSelector,
  mapDispatchToProps
)(fretboard)

export default Fretboard
