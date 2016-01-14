var React = require("react");
var ReactDOM = require("react-dom");

var _ = require("lodash");

var Fretboard = require("./Fretboard");

let App = React.createClass({
    getInitialState() {
	return {
	    value: "",
	    strings: [{ note: "E",
			octave: 4 },
		      { note: "B",
			octave: 3 },
		      { note: "G",
			octave: 3 },
		      { note: "D",
			octave: 3 },
		      { note: "A",
			octave: 2 },
		      { note: "E",
			octave: 2 }]
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


    render() {
	return <div> 
            <div> 
            {"Value is " + this.state.value + "!"}
        </div>
            <div> 
            <input 
        type="text" 
        key="myUniqueComponentIdentifier"
        onChange={({target: {value}}) => {
            this.state.value = value;
            this.setState(this.state);
        }} /> 
            </div>
	    <Fretboard
        appState={this.state}
        setAppState={this.setAppState} />
	    </div>;
    }
});
ReactDOM.render(<App/>, document.getElementById("app-container"));

