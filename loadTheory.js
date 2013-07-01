function resize_board(id){
	var canvas = document.getElementById(id);
	if (canvas.width != window.innerWidth)
	{
		canvas.width = window.innerWidth;
		canvas.setAttribute("width",window.innerWidth);
	}

	if (canvas.height != window.innerHeight)
	{
		if(window.innerHeight * .20 < 210){
			canvas.height = 210;
			canvas.setAttribute("height", 210);
		} else {
			canvas.height = window.innerHeight * .20;
			canvas.setAttribute("height", window.innerHeight * .20);
		}
	}
}

function load_theory(){
	this.svgboard = new fretBoard();
//	this.controller = new ctrlPanel(svgboard);
//	resize_theory();
}

function resize_theory(){
//	resize_board("fretBoard");
//	resize_board("noteBoard");
	resize_board("fretBoard");
	svgboard.resize();
}

Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry with - return function
    }
    var that = this;
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments);
    return function() {
        var innerFunctionSlice = slice.apply(arguments);
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
}

window.onload = load_theory;
window.onresize = resize_theory;