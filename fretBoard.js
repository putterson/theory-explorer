function fretBoard(){
	var xmlns="http://www.w3.org/2000/svg";
	
	//svg meta elements
	var container;
	var svg;
	var g_fret;
	var g_note;
	var g_string;

	//svg drawing elements
	var strings;
	var frets;
	var fretmarkers;
	var fretnums;
	var notes;
	var nut;

	//svg element parameters
	var c_stroke = "#555555";
	var c_fill = "#555555";
	var c_marker = "#999999";
	var c_note = "#FFFFFF";
	var c_note_active = "#73E6BF";
	var c_note_selected = "#F385F3";
	var c_notestroke = "#000000";
	var c_text = "#000000";
	var s_font = 10;
	var s_note_font = 12;
	
	
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
		svg.setAttribute("id","fretBoard");
		
		resize_params();
		
		container.appendChild(svg);
		
		//create fret and note svg groups
		g_note = document.createElementNS(xmlns, "g");
		g_fret = document.createElementNS(xmlns, "g");
		g_string = document.createElementNS(xmlns, "g");
	
		g_note.setAttribute("id", "g_note");
		g_fret.setAttribute("id", "g_fret");
		g_string.setAttribute("id", "g_string");
	
		svg.appendChild(g_fret);
		svg.appendChild(g_string);
		svg.appendChild(g_note);
	
		create_strings();
		create_frets();
		create_notes();
		
	}
	
	function resize_params(){
		//should make a height var for this magic 0.20
		if(window.innerHeight * 0.20 < 210){
			svg.setAttribute("height", 210);
		} else {
			svg.setAttribute("height",window.innerHeight * 0.20);
		}
		svg.setAttribute("width",window.innerWidth);
		cwidth  = svg.getAttribute("width");
		cheight = svg.getAttribute("height");
		lpad = 25;//cwidth * .05;
		rpad = 25;//cwidth * .05;
		tpad = cheight* .20;
		bpad = cheight* .10;
		bwidth  = cwidth  - lpad - rpad;
		bheight = cheight - tpad - bpad;
		nfrets = (bwidth / 50) - ((bwidth / 50) % 1);
	}

	function create_strings(){
		clear_elem(g_string);
		strings = new Array();
		var line;
		for(var i=0; i < nstrings; i++){
			line = document.createElementNS(xmlns, "line");
			line.setAttribute("id","string");
			strings[i] = line;
			g_string.appendChild(line);
		}
	}
	
	//create frets, fret markers, fret numbers
	function create_frets(){
		clear_elem(g_fret);
		frets = new Array();
		fretmarkers = {};
		fretnums = new Array();
		
		//create nut seperately
		var rect;
		rect = document.createElementNS(xmlns, "rect");
		nut = rect;
		g_fret.appendChild(rect);
		
		var line;
		
		for (var i=0; i<=nfrets; i++){
			line = document.createElementNS(xmlns, "line");
			frets[i] = line;
			g_fret.appendChild(line);

			fretMarkerPos(i,function(elem){
				elem = document.createElementNS(xmlns, "circle");
				elem.setAttribute("fill", c_marker);
				g_fret.appendChild(elem);
				return elem;
			});

			fretNumberPos(i,function(elem){
				elem = document.createElementNS(xmlns, "text");
				elem.textContent=i;
				elem.setAttribute("fill", c_text);
				elem.setAttribute("font-family", "Monospace");
				elem.setAttribute("font-size", s_font);
				elem.setAttribute("text-anchor", "middle");
				g_fret.appendChild(elem);
				return elem;
			});
		}
	}

	function create_notes(){
		clear_elem(g_note);
		notes = {};
		forAllNotes(
			notePos.curry(function(elem, x, y){
				elem = document.createElementNS(xmlns, "g");

				circleelem = document.createElementNS(xmlns, "circle");
				circleelem.setAttribute("stroke", "black");
				circleelem.setAttribute("fill", c_note_active);
				circleelem.setAttribute("stroke", "black");
				elem.appendChild(circleelem);

				textelem = document.createElementNS(xmlns, "text");
				textelem.setAttribute("fill", c_text);
				textelem.setAttribute("font-family", "sans-serif");
				textelem.setAttribute("font-size", s_note_font);
				textelem.setAttribute("text-anchor", "middle");
				textelem.setAttribute("dominant-baseline", "central");



				elem.appendChild(textelem);

				g_note.appendChild(elem);
				return elem;
			})
		);
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
		var nutwidth = 4;
		nut.setAttribute("x", alignx(lpad - nutwidth));
		nut.setAttribute("y", alignx(tpad));
		nut.setAttribute("height", alignx(bheight + (nstrings*stringwidth)));
		nut.setAttribute("width", nutwidth + 1 );
		nut.setAttribute("style", "fill: black;");
		for (var i=0; i<frets.length; i++){
			var x = aligny((i*(bwidth/nfrets)) + lpad);
			frets[i].setAttribute("x1", x);
			frets[i].setAttribute("y1", aligny(tpad));
			frets[i].setAttribute("x2", x);
			frets[i].setAttribute("y2", aligny(tpad + bheight));

			if ( i <= nfrets ){
				frets[i].setAttribute("style", "stroke-width: 1px; stroke: black;");
			} else {
				frets[i].setAttribute("style", "stroke-width: 1px; stroke: black; visibility: hidden");
			}

			fretMarkerPos(i,function(elem, x, y){
				elem.setAttribute("r", bheight * 0.05 );
				elem.setAttribute("cx", x);
				elem.setAttribute("cy", y);
				if ( i <= nfrets ){ elem.setAttribute("style", ""); }
				else { elem.setAttribute("style", "visibility: hidden;"); }
				return elem;
			});

			fretNumberPos(i,function(elem, x, y){
				elem.setAttribute("x", x);
				elem.setAttribute("y", y);
				if ( i <= nfrets ){ elem.setAttribute("style", ""); }
				else { elem.setAttribute("style", "visibility: hidden;"); }
				return elem;
			});
		}
	}

	function resize_notes(){
		forAllNotes(
			notePos.curry(function(elem, args){
				circleelem = elem.childNodes[0];
				textelem = elem.childNodes[1];

				textelem.setAttribute("x", circleelem.getAttribute("cx"));
				textelem.setAttribute("y", circleelem.getAttribute("cy"));

				circleelem.setAttribute("cx", args.x);
				circleelem.setAttribute("cy", args.y);
				circleelem.setAttribute("r", bheight * 0.07);
				if ( args.i <= nfrets ){ elem.setAttribute("style", ""); }
				else { elem.setAttribute("style", "visibility: hidden;"); }
				return elem;
			})
		);
	}

	this.update_notes = function(f){
		forAllNotes(
			notePos.curry(function(elem){
				textelem.textContent = "A♯";
				return elem;
			})
		);
	}

	function forAllNotes(f){
		for (var s=0; s < strings.length; s++){
			for (var i=0; i < frets.length ; i++){
				f(i,s);
			}
		}

	}

	//accept a function and an iteration number
	//the function should accept an svg element and return one
	function fretMarkerPos(i,f){
		var x = aligny((i*(bwidth/nfrets)) + lpad - (bwidth/nfrets/2));
		if (i > 1 && i % 2 == 1 && (i+1) % 12 != 0 && (i-1) % 12 != 0){
			fretmarkers[i] = f( fretmarkers[i], x, tpad + (bheight/2) );
		} else if (i > 1 && i % 12 == 0){
			fretmarkers[i+"t"] = f( fretmarkers[i+"t"], x, tpad + (bheight*(1/3)) );
			fretmarkers[i+"b"] = f( fretmarkers[i+"b"], x, tpad + (bheight*(2/3)) );
		}

	}

	//accept a function and an iteration number
	//the function should accept an svg element and return one
	function fretNumberPos(i,f){
		if ( i == 0 ) { x = aligny((i*(bwidth/nfrets)) + lpad - 3) }
		else { x = aligny((i*(bwidth/nfrets)) + lpad - (bwidth/nfrets/2)); }
		fretnums[i] = f( fretnums[i], x, alignx(tpad) - 15);
	}

	function notePos(f,i,s){
		var x;
		if ( i == 0 ) { x = aligny((i*(bwidth/nfrets)) + lpad ); }
		else { x = aligny((i*(bwidth/nfrets)) + lpad - (bwidth/nfrets/2)); }

		var args = {
			"x" : x,
			"y" : aligny(s*(bheight/(nstrings - 1)) + tpad),
			"i" : i,
			"s" : s
		}

		notes[s+"_"+i] = f( notes[s+"_"+i], args);
	}

	//clear all children from svg g element
	function clear_elem(elem){
		while (elem.lastChild) {
			elem.removeChild(elem.lastChild);
		}
	}

	this.resize = function(){
		resize_params();
		if ( frets.length <= nfrets ){
			create_frets();
			create_notes();
		} else if ( strings.length < nstrings ){
			create_strings();
			create_notes();
		}
		resize_strings();
		resize_frets();
		resize_notes();
	}
	
	construct();
	this.resize();
}