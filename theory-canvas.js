function Board(fb,nb){
	var nfrets = 15;
	var nstrings = 6;
	
	var canvas_fret = document.getElementById(fb);
	var canvas_note = document.getElementById(nb);
	var ctx_fret = canvas_fret.getContext("2d");
	var ctx_note = canvas_note.getContext("2d");
	
	//These are applicable to both the noteBoard and fretBoard as they should be the same size
	var cwidth  = canvas_fret.width;
	var cheight = canvas_fret.height;
	var lpad = canvas_fret.width * .05;
	var rpad = canvas_fret.width * .05;
	var tpad = canvas_fret.height* .20;
	var bpad = canvas_fret.height* .10;
	var bwidth  = cwidth  - lpad - rpad;
	var bheight = cheight - tpad - bpad;
	
	//Some canvas drawing parameters
	var c_stroke = "#555555";
	var c_fill = "#555555";
	var c_marker = "#999999";
	var c_markerstroke = "#FFFFFF";
	var c_string = "#111111";
	var c_note = "#FFFFFF";
	var c_note_active = "#73E6BF";
	var c_note_selected = "#F385F3";
	var c_notestroke = "#000000";
	var c_text = "#000000";
	var strokewidth = 1;
	var stringwidth = 0.4;

	ctx_fret.font="10px Monospace";
	ctx_note.font="12px Sans Serif";
	
	//Music Theory
	var a_tuning =["E","A","D","G","B","E"];
	var a_notes = new Array("A","A♯","B","C","C♯","D","D♯","E","F","F♯","G","G♯");
	var a_Em_pentatonic = ["E","G","A","B","D"]
	
	function resize(){
		cwidth  = canvas_fret.width;
		cheight = canvas_fret.height;
		lpad = 25;//canvas_fret.width * .05;
		rpad = 25;//canvas_fret.width * .05;
		tpad = canvas_fret.height* .20;
		bpad = canvas_fret.height* .10;
		bwidth  = cwidth  - lpad - rpad;
		bheight = cheight - tpad - bpad;
		nfrets = (bwidth / 50) - ((bwidth / 50) % 1);
	}
	
	function align(x){
			return x - (x % 1) + 0.5;
	}
	
	//draw a fretmarker
	function fretmarker(x,y){
		x = align(x);
		y = align(y);
		
		ctx_fret.fillStyle = c_marker;
		ctx_fret.strokeStyle = c_markerstroke;
		
		var size = bheight * 0.05;
		ctx_fret.beginPath();
		ctx_fret.arc( x, y, size, 0, 2*Math.PI);
		ctx_fret.closePath();
		ctx_fret.fill();
		
		ctx_fret.fillStyle = c_fill;
		ctx_fret.strokeStyle = c_stroke;
	}
	
	//draw the note names
	this.draw_notes = function(){
		var n_start = 0;
		var n_note = 0;
		var x = 0;
		var y = 0;
		for(var s=nstrings-1; s >= 0; s--){
			start = a_notes.indexOf(a_tuning[a_tuning.length - s - 1]);
			y = align((s*(bheight/(nstrings - 1))) + tpad);
			
			//handle fret 0 seperately
			x = align((0*(bwidth/nfrets)) + lpad);
			

			
			for(var f=0; f <= nfrets; f++){
				x = align((f*(bwidth/nfrets)) + lpad);
				if (f==0){ x -= 6; }
				else { x -= 20; }
				
				if (a_Em_pentatonic.indexOf(a_notes[(start + f) % 12]) >= 0){
					ctx_note.fillStyle = c_note_selected;

				ctx_note.strokeStyle = c_notestroke;
				
				ctx_note.beginPath();
				ctx_note.arc(x+6,y, 9, 0, 2*Math.PI);
				ctx_note.closePath();
				ctx_note.stroke();
				ctx_note.fill();
				
				ctx_note.fillStyle = c_text;
				ctx_note.strokeStyle = c_text;
				
				ctx_note.fillText(a_notes[(start + f) % 12], x, y + 4);
				}else {
					ctx_note.fillStyle = c_note_active;
				}
			}
		}
	}
	
	//draw the string lines~
	this.draw_strings = function(){
		ctx_fret.strokeStyle = c_string;
		for (var x=0; x<nstrings; x++)
		{
			ctx_fret.lineWidth = 1 + (x*stringwidth);
			ctx_fret.beginPath();
			ctx_fret.moveTo( align(lpad) , align((x*(bheight/(nstrings - 1))) + tpad) );
			ctx_fret.lineTo( align(lpad + bwidth) , align((x*(bheight/(nstrings - 1))) + tpad) );
			ctx_fret.closePath();
			ctx_fret.stroke();
		}
		ctx_fret.linewidth = strokewidth;
		ctx_fret.strokeStyle = c_stroke;
	}
	
	//draw the fret lines and numbers and markers
	this.draw_frets = function(){
		
		//draw the nut
		ctx_fret.fillStyle = c_fill;
		ctx_fret.fillRect(lpad-3 , tpad - 5 , 3, bheight + 10);
		ctx_fret.strokeStyle = c_stroke;
		
		var x=0;
		for (var i=x; i<(nfrets + 1); i++)
		{
			x = align((i*(bwidth/nfrets)) + lpad);
			
			if (i > 1 && i % 2 == 1 && (i+1) % 12 != 0 && (i-1) % 12 != 0){
				fretmarker(x - (bwidth/nfrets/2), tpad + (bheight/2))
			} else if (i > 1 && i % 12 == 0){
				fretmarker(x - (bwidth/nfrets/2), tpad + (bheight*(1/3)));
				fretmarker(x - (bwidth/nfrets/2), tpad + (bheight*(2/3)));
			}
			ctx_fret.beginPath();
			ctx_fret.moveTo( x , align(tpad) );
			ctx_fret.lineTo( x , align(tpad + bheight) );
			ctx_fret.closePath();
			ctx_fret.stroke();
			
			ctx_fret.fillText(i, x - 4, align(tpad) - 15);
		}
	}
	
	this.draw = function(){
		resize();
		this.draw_frets();
		this.draw_strings();
		this.draw_notes();
	}
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
	this.board = new Board("fretBoard","noteBoard");
	resize_theory();
}

function resize_theory(){
	resize_board("fretBoard");
	resize_board("noteBoard");
	board.draw();
}

window.onload = load_theory;
window.onresize = resize_theory;