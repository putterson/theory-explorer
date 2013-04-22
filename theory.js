function drawBoard(){
	var nfrets = 14;
	var nstrings = 6;
	
	var c = document.getElementById("fretBoard");
	var ctx = c.getContext("2d");
	var cwidth  = c.width;
	var cheight = c.height;
	var lpad = c.width * .05;
	var rpad = c.width * .05;
	var tpad = c.height* .10;
	var bpad = c.height* .10;
	var bwidth  = cwidth  - lpad - rpad;
	var bheight = cheight - tpad - bpad;
	
	function align(x){
			return x - (x % 1) + 0.5;
	}
	
	//draw the nut
	ctx.fillStyle = "#555555";
	ctx.fillRect(lpad-3 , tpad ,  , tpad+bheight);
	
	//draw the fret lines
	for (var x=0; x<(nfrets + 1); x++)
	{
		ctx.moveTo( align((x*(bwidth/nfrets)) + lpad) , align(tpad) );
		ctx.lineTo( align((x*(bwidth/nfrets)) + lpad) , align(tpad + bheight) );
		ctx.stroke();
	}
	
	//draw the string lines
	for (var x=0; x<(nstrings + 1); x++)
	{
		ctx.moveTo( align(lpad) , align((x*(bheight/nstrings)) + tpad) );
		ctx.lineTo( align(lpad + bwidth) , align((x*(bheight/nstrings)) + tpad) );
		ctx.stroke();
	}
}

drawBoard();