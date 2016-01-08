var React = require("react");
var ReactDOM = require("react-dom");

var Fretboard = require("./Fretboard");

let App = React.createClass({
  getInitialState() {
      return {value: ""};
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

