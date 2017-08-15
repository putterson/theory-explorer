import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { toggleSelectNote } from '../actions'
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

  render: function() {
    return (
	<div className='Fretboard'></div>
    )
  }  
})

let mapDispatchToProps : (dispatch : any) => any = function (dispatch) {
  return {
    onSelectNote: (id, selected) => {
      dispatch(toggleSelectNote(id, selected))
    }
  }
}

const Fretboard = connect(
  visibleFretboardSelector,
  mapDispatchToProps
)(fretboard)

export default Fretboard
