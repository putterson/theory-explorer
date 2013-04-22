function drawBoard(){
	var nfrets = 14;
	var nstrings = 6;
	
	var canvas_fret = document.getElementById("fretBoard");
	var canvas_note = document.getElementById("noteBoard");
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
	var strokewidth = 1;
	var stringwidth = 0.4;
	
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
	
	//draw the string lines~
	function draw_strings(){
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
	function draw_frets(){
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

	//draw the nut
	ctx_fret.fillStyle = c_fill;
	ctx_fret.fillRect(lpad-3 , tpad - 5 , 3, bheight + 10);
	
	ctx_fret.strokeStyle = c_stroke;
	ctx_fret.font="10px Monospace";
	
	draw_frets();
	draw_strings();

}

function resize_board(id){
	canvas = document.getElementById(id);
	if (canvas.width  != window.innerWidth)
	{
		canvas.width  = window.innerWidth;
	}

	if (canvas.height != window.innerHeight)
	{
		if(window.innerHeight * .20 < 120){
			canvas.height = 120;
		} else {
			canvas.height = window.innerHeight * .20;
		}
	}
}

function resize_theory(){
	resize_board("fretBoard");
	resize_board("noteBoard");
	drawBoard();
}