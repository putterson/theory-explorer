var React = require("react");
var ReactDOM = require("react-dom");

var _ = require("lodash");

var Fretboard = require("./Fretboard");
import Board from "./Board"

let App = React.createClass({
    getInitialState() {
	var default_tuning = Board.getDefaultTuning();
	return {
	    viewhints: { fret_start: 0,
			 fret_end: 22 },
	    tuning: default_tuning,
	    strings: Board.getStrings(default_tuning),
	    frets: Board.getFrets(0,24),
	    fretmarkers: Board.getFretMarkers(0,24)
	};
    },

    componentDidMount() {
	window.addEventListener('resize', this.handleResize);
    },

    handleResize() {
	this.setAppState(this.state);
    },

    setAppState(partialState, callback) {
	return this.setState(partialState, callback);
    },

    setTuning(tuning) {
	this.state.tuning = tuning;
	this.state.strings = Board.getStrings(tuning);
	this.setState(this.state);
    },


    render() {
	return <div> 
	    <div> 
	    {"Tuning is " + this.state.tuning.name}
            </div>
	    <div> 
	    <select value={this.state.tuning.name}
	            onChange={({target: {value}}) => {
			this.setTuning(Board.getTuning(value));
		    }}>
	    {
		Board.getTunings().map(function(tuning) {
		    return <option key={tuning.name}
		    value={tuning.name}>{tuning.name}</option>;
		})
	    }
	    </select>
	    </div>
	    <Fretboard
                appState={this.state}
                setAppState={this.setAppState} />
	    </div>;
    }
});
ReactDOM.render(<App/>, document.getElementById("app-container"));

