function drawBoard(){
	var nfrets = 14;
	var nstrings = 6;
	
	var c = document.getElementById("fretBoard");
	var ctx = c.getContext("2d");
	var cwidth  = c.width;
	var cheight = c.height;
	var lpad = c.width * .05;
	var rpad = c.width * .05;
	var tpad = c.height* .20;
	var bpad = c.height* .10;
	var bwidth  = cwidth  - lpad - rpad;
	var bheight = cheight - tpad - bpad;
	
	var strokecolor = "#555555";
	var fillcolor = "#555555";
	var markercolor = "#999999";
	var markerstroke = "#FFFFFF";
	
	function align(x){
			return x - (x % 1) + 0.5;
	}
	
	function fretmarker(x,y){
		x = align(x);
		y = align(y);
		
		ctx.fillStyle = markercolor;
		ctx.strokeStyle = markerstroke;
		
		var size = bwidth * 0.005;
		ctx.beginPath();
		ctx.arc( x, y, size, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = fillcolor;
		ctx.strokeStyle = strokecolor;
	}
	
	//draw the nut
	ctx.fillStyle = fillcolor;
	ctx.fillRect(lpad-3 , tpad , 3, bheight);
	
	ctx.strokeStyle = strokecolor;
	ctx.font="10px Monospace";
	
	//draw the fret lines and numbers and markers
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
		ctx.beginPath();
		ctx.moveTo( x , align(tpad) );
		ctx.lineTo( x , align(tpad + bheight) );
		ctx.closePath();
		ctx.stroke();
		
		ctx.fillText(i, x - 4, align(tpad) - 15);
	}
	
	//draw the string lines
	for (var x=0; x<nstrings; x++)
	{
		ctx.moveTo( align(lpad) , align((x*(bheight/(nstrings - 1))) + tpad) );
		ctx.lineTo( align(lpad + bwidth) , align((x*(bheight/(nstrings - 1))) + tpad) );
		ctx.stroke();
	}
	

}

function resize_fretboard(){
	canvas = document.getElementById("fretBoard");
	if (canvas.width  != window.innerWidth)
	{
		canvas.width  = window.innerWidth;
	}

	if (canvas.height != window.innerHeight)
	{
		canvas.height = window.innerHeight * .20;
	}
}

function resize_theory(){
	resize_fretboard();
	drawBoard();
}