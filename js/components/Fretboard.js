var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var d3Fretboard = require('../d3/d3Fretboard');

var Fretboard = React.createClass({
    getDefaultProps: function() {
	return {
	    width: '100%',
	    height: '200px'
	};
    },

    dispatcher: null,

    componentDidMount: function() {
	var el = ReactDOM.findDOMNode(this);
	var dispatcher = d3Fretboard.create(el, {
	    width: this.props.width,
	    height: this.props.height
	}, this.getFretboardState());
	this.dispatcher = dispatcher;
    },

    componentDidUpdate: function(prevProps, prevState) {
	var el = ReactDOM.findDOMNode(this);
	d3Fretboard.update(el, this.getFretboardState(), this.dispatcher);
	
    },

    getFretboardState: function() {
	var appState = this.props.appState;

	var tooltips = [];
	if (appState.showingAllTooltips) {
	    tooltips = appState.data;
	}
	else if (appState.tooltip) {
	    tooltips = [appState.tooltip];
	}

	return _.assign({}, appState, {tooltips: tooltips});
    },

    render: function() {
	return (
		<div className='Fretboard'></div>
	);
    },

    handleResize: function() {
    },

    showTooltip: function(d) {
	if (this.props.appState.showingAllTooltips) {
	    return;
	}

	this.props.setAppState({
	    tooltip: d,
	    // Disable animation
	    prevDomain: null
	});
    },

    hideTooltip: function() {
	if (this.props.appState.showingAllTooltips) {
	    return;
	}
	
	this.props.setAppState({
	    tooltip: null,
	    prevDomain: null
	});
    }
});

module.exports = Fretboard;