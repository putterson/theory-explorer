function svgBoard(){
	var xmlns="http://www.w3.org/2000/svg";
	
	//svg meta elements
	var container;
	var svg;
	var g_fret;
	var g_note;
	
	//svg drawing elements
	var strings;
	var frets;
	var fretnums;
	var nut;
	
	
	//params
	var nfrets = 15;
	var nstrings = 6;
	var stringwidth = 0.4;
	
	//These are applicable to both the noteBoard and fretBoard as they should be the same size
	var cwidth;
	var cheight;
	var lpad;
	var rpad;
	var tpad;
	var bpad;
	var bwidth;
	var bheight;
	
	function alignx(x){
			return x - (x % 1);
	}
	this.alignon = alignx;
	
	function aligny(x){
			return x - (x % 1) + 0.5;
	}
	this.alignin = aligny;
	
	
	//populate all persistent objects
	function construct(){
		//create initial svg elem
		container = document.getElementById("svgContainer");
		svg = document.createElementNS(xmlns, "svg");
		svg.setAttribute("version", "1.2");
		svg.setAttribute("baseProfile", "tiny");
		svg.setAttribute("id","svgBoard");
		
		resize_params();
		
		container.appendChild(svg);
		
		//create fret and note svg groups
		g_note = document.createElementNS(xmlns, "g");
		g_fret = document.createElementNS(xmlns, "g");
		
		svg.appendChild(g_note);
		svg.appendChild(g_fret);
		
		create_strings();
		create_frets();
		
	}
	
	function resize_params(){
		svg.setAttribute("height",window.innerHeight * 0.20);
		svg.setAttribute("width",window.innerWidth);
		cwidth  = svg.getAttribute("width");
		cheight = svg.getAttribute("height");
		lpad = 25;//cwidth * .05;
		rpad = 25;//cwidth * .05;
		tpad = cheight* .20;
		bpad = cheight* .10;
		bwidth  = cwidth  - lpad - rpad;
		bheight = cheight - tpad - bpad;
	}

	function create_strings(){
		strings = new Array();
		var line;
		for(var i=0; i < nstrings; i++){
			line = document.createElementNS(xmlns, "line");
			line.setAttribute("id","string");
			strings[i] = line;
			g_fret.appendChild(line);
		}
	}
	
	function create_frets(){
		frets = new Array();
		
		//create nut seperately
		var rect;
		rect = document.createElementNS(xmlns, "rect");
		nut = rect;
		g_fret.appendChild(rect);
		
		var line;
		var x;
		
		for (var i=0; i<=nfrets; i++)
		{
			line = document.createElementNS(xmlns, "line");
			frets[i] = line;
			g_fret.appendChild(line);
		}
	}
	
	function resize_strings(){
		for(var x=0; x < nstrings; x++){
			strings[x].setAttribute("x1", alignx(lpad) );
			strings[x].setAttribute("y1", aligny(x*(bheight/(nstrings - 1)) + tpad) );
			strings[x].setAttribute("x2", alignx(lpad + bwidth) );
			strings[x].setAttribute("y2", aligny(x*(bheight/(nstrings - 1)) + tpad) );
			strings[x].setAttribute("style", "stroke-width: " + (1 + (x*stringwidth)) + "px;" + "stroke: black;");
		}
	}
	
	function resize_frets(){
		for (var i=0; i<= nfrets; i++){
			x = aligny((i*(bwidth/nfrets)) + lpad);
			frets[i].setAttribute("x1", x);
			frets[i].setAttribute("y1", aligny(tpad));
			frets[i].setAttribute("x2", x);
			frets[i].setAttribute("y2", aligny(tpad + bheight));
			frets[i].setAttribute("style", "stroke-width: 1px; stroke: black;");
		}
	}
	
	this.resize = function(){
		resize_params();
		resize_strings();
		resize_frets();
	}
	
	construct();
	this.resize();
}

function resize_board(id){
	var canvas = document.getElementById(id);
	if (canvas.width != window.innerWidth)
	{
		canvas.width = window.innerWidth;
		canvas.setAttribute("width",window.innerWidth);
	}

	if (canvas.height != window.innerHeight)
	{
		if(window.innerHeight * .20 < 150){
			canvas.height = 150;
			canvas.setAttribute("height", 150);
		} else {
			canvas.height = window.innerHeight * .20;
			canvas.setAttribute("height", window.innerHeight * .20);
		}
	}
}

function load_theory(){
	this.svgboard = new svgBoard();
// 	this.board = new Board("fretBoard","noteBoard");
	resize_theory();
}

function resize_theory(){
	resize_board("fretBoard");
	resize_board("noteBoard");
	resize_board("svgBoard");
	svgboard.resize();
// 	board.draw();
}

window.onload = load_theory;
window.onresize = resize_theory;