var svgboard, theory, controller;

function resize_board(id){
	var elem = document.getElementById(id);
	if (elem.width != window.innerWidth)
	{
		elem.width = window.innerWidth;
		elem.setAttribute("width",window.innerWidth);
	}

	if (elem.height != window.innerHeight)
	{
		if(window.innerHeight * .20 < 210){
			elem.height = 210;
			elem.setAttribute("height", 210);
		} else {
			elem.height = window.innerHeight * .20;
			elem.setAttribute("height", window.innerHeight * .20);
		}
	}
}

function load_theory(){
	svgboard = new fretBoard();
	theory = new musicTheory();
	controller = new ctrlPanel(svgboard, theory);
//	resize_theory();
}

function resize_theory(){
//	resize_board("fretBoard");
//	resize_board("noteBoard");
	resize_board("fretBoard");
	svgboard.resize();
}

window.onload = load_theory;
window.onresize = resize_theory;