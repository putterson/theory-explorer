var React = require('react');
var _ = require('lodash');

var d3Fretboard = require('./d3Fretboard');

var Fretboard = React.createClass({
    getDefaultProps: function() {
	return {
	    width: '100%',
	    height: '300px'
	};
    },

    dispatcher: null,

    componentDidMount: function() {
	var el = this.getDOMNode();
	var dispatcher = d3Fretboard.create(el, {
	    width: this.props.width,
	    height: this.props.height
	}, this.getFretboardState());
	this.dispatcher = dispatcher;
    },

    componentDidUpdate: function(prevProps, prevState) {
	var el = this.getDOMNode();
	console.log("Fretboard update");
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
	console.log("resize");	
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
