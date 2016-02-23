var EventEmitter = require('events').EventEmitter;
var d3 = require('d3');

var fretboard = {};


fretboard.create = function(el, props, state) {
    var svg = d3.select(el).append('svg')
	.attr('class', 'd3-fretboard')
	.attr('width', props.width)
	.attr('height', props.height);
    
    svg.append('g')
	.attr('class', 'd3-strings');

    svg.append('g')
	.attr('class', 'd3-frets');

    svg.append('g')
	.attr('class', 'd3-fret-numbers');
    
    var dispatcher = new EventEmitter();
    this.update(el, state, dispatcher);

    return dispatcher;
};

fretboard.getDimentions = function(el, state) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    var lpad = 25;
    var rpad = 25;
    var tpad = height* .20;
    var bpad = height* .10;
    var viewhints= state.viewhints;
    var bwidth = width  - lpad - rpad;
    var bheight = height - tpad - bpad;

    var getFretPosition = function(){
	function calcFretPosition(i) {
	    //https://en.wikipedia.org/wiki/Scale_length_(string_instruments)
	    //12throot(2) / (12throot(2) - 1)
	    var divisor = 17.817154;
	    
	    var stringwidth = bwidth;
	    var pos = 0;
	    for(var n= 0; n<i; n++){
		pos += stringwidth / divisor;
		stringwidth = bwidth - pos;
	    }
	    return pos;	
	}

	
	return function(d,i){
	    var start_position = calcFretPosition(viewhints.fret_start);
	    var end_position = calcFretPosition(viewhints.fret_end);
	    return (calcFretPosition(d.n) - start_position) / (end_position - start_position) * bwidth + lpad;
	};
    };
    
    return {
	lpad: lpad,
	rpad: rpad,
	tpad: tpad,
	bpad: bpad,
	bwidth: bwidth,
	bheight: bheight,
	getFretPosition: getFretPosition
    };
};

fretboard.update = function(el, state, dispatcher) {
    var svg = d3.select(el).selectAll('.d3-fretboard');
    var dimentions = this.getDimentions(el,state);
    this._drawStrings(el, dimentions, state.strings);
    this._drawFrets(el, dimentions, state.frets);
    this._drawFretNumbers(el, dimentions, state.frets);
};



//dim is dimentions
fretboard._drawStrings = function(el, dim, strings) {
    var g = d3.select(el).selectAll('.d3-strings');
    


    var stringwidth = 0.5;



    var nstrings = strings.length;

    var string = g.selectAll('line')
	.data(strings);//, function(s) {return s.note+'-'+s.octave+'-'+width;});

    var stringStyle = function(d,i) { 
	var dashed = "";
	if (i > 2) {
	    dashed = "stroke-dasharray: 1.5,0.5;";
	}						
	return "stroke-width: " + (1 + (i*stringwidth)) + "px;" + "stroke: black;" + dashed;};
    
    //update existing strings
    string
	.attr('x1', alignx(dim.lpad))
	.attr('y1', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
	.attr('x2', function(d,i) {return alignx(dim.lpad + dim.bwidth);})
	.attr('y2', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr('style', stringStyle);

    //add any new strings
    string.enter().append('line')
	.attr('class', 'd3-string')
	.attr('x1', alignx(dim.lpad))
	.attr('y1', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
	.attr('x2', function(d,i) {return alignx(dim.lpad + dim.bwidth);})
	.attr('y2', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr('style', stringStyle);

    //remove any extra strings
    string.exit().remove();
};


fretboard._drawFrets = function(el, dim, frets) {
    var g = d3.select(el).selectAll('.d3-frets');

    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var fret = g.selectAll('line')
	    .data(frets,function(f){return f.n;});
    
    var fretStyle = function(d, i) {
	var width;
	if(i === 0){
	    width = "6px";
	}else {
	    width = "2px";
	}
	return "stroke-width: "+width+"; stroke: black;";
    };



    //Update existing frets
    fret
	.attr("x1", dim.getFretPosition())
    	.attr("y1", aligny(dim.tpad))
	.attr("x2", dim.getFretPosition())
	.attr("y2", aligny(dim.tpad+dim.bheight))
	.attr('style', fretStyle);

    //Add any new frets
    fret.enter().append('line')
	.attr("x1", dim.getFretPosition())
    	.attr("y1", aligny(dim.tpad))
	.attr("x2", dim.getFretPosition())
	.attr("y2", aligny(dim.tpad+dim.bheight))
    	.attr('style', fretStyle);

    fret.exit().remove();
};

fretboard._drawFretNumbers = function(el, dim, frets) {
    var g = d3.select(el).selectAll('.d3-fret-numbers');

    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var num = g.selectAll('text')
	    .data(frets, function(f){return f.n;});

    var fretPosition = function(d, i){
	//https://en.wikipedia.org/wiki/Scale_length_(string_instruments)
	//12throot(2) / (12throot(2) - 1)
	var divisor = 17.817154;
	
	var stringwidth = dim.bwidth;
	var pos = 0;
	for(var n= 0; n<i; n++){
	    pos += stringwidth / divisor;
	    stringwidth = dim.bwidth - pos;
	}
	return (pos) + dim.lpad;
    };

    num
	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
	.attr("x", dim.getFretPosition())
	.attr("y", dim.tpad - 10)
	.text(function(d,i) {return d.n;});

    num.enter().append('text')
    	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
    	.attr("x", dim.getFretPosition())
	.attr("y", dim.tpad - 10)
	.text(function(d,i) {return d.n;});

};

fretboard._drawPoints = function(el, scales, data, prevScales, dispatcher) {
    var g = d3.select(el).selectAll('.d3-points');

    var point = g.selectAll('.d3-point')
	.data(data, function(d) { return d.id; });

    point.enter().append('circle')
	.attr('class', 'd3-point')
	.attr('cx', function(d) {
	    if (prevScales) {
		return prevScales.x(d.x);
	    }
	    return scales.x(d.x);
	})
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('cx', function(d) { return scales.x(d.x); });

    point.attr('cy', function(d) { return scales.y(d.y); })
	.attr('r', function(d) { return scales.z(d.z); })
	.on('mouseover', function(d) {
	    dispatcher.emit('point:mouseover', d);
	})
	.on('mouseout', function(d) {
	    dispatcher.emit('point:mouseout', d);
	})
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('cx', function(d) { return scales.x(d.x); });

    if (prevScales) {
	point.exit()
	    .transition()
	    .duration(ANIMATION_DURATION)
	    .attr('cx', function(d) { return scales.x(d.x); })
	    .remove();
    }
    else {
	point.exit()
	    .remove();
    }
};

fretboard._drawTooltips = function(el, scales, tooltips, prevScales) {
    var g = d3.select(el).selectAll('.d3-tooltips');

    var tooltipRect = g.selectAll('.d3-tooltip-rect')
	.data(tooltips, function(d) { return d.id; });

    tooltipRect.enter().append('rect')
	.attr('class', 'd3-tooltip-rect')
	.attr('width', TOOLTIP_WIDTH)
	.attr('height', TOOLTIP_HEIGHT)
	.attr('x', function(d) {
	    if (prevScales) {
		return prevScales.x(d.x) - TOOLTIP_WIDTH/2;
	    }
	    return scales.x(d.x) - TOOLTIP_WIDTH/2;
	})
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d) { return scales.x(d.x) - TOOLTIP_WIDTH/2; });

    tooltipRect.attr('y', function(d) { return scales.y(d.y) - scales.z(d.z)/2 - TOOLTIP_HEIGHT; })
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d) { return scales.x(d.x) - TOOLTIP_WIDTH/2; });

    if (prevScales) {
	tooltipRect.exit()
	    .transition()
	    .duration(ANIMATION_DURATION)
	    .attr('x', function(d) { return scales.x(d.x) - TOOLTIP_WIDTH/2; })
	    .remove();
    }
    else {
	tooltipRect.exit()
	    .remove();
    }

    var tooltipText = g.selectAll('.d3-tooltip-text')
	.data(tooltips, function(d) { return d.id; });

    tooltipText.enter().append('text')
	.attr('class', 'd3-tooltip-text')
	.attr('dy', '0.35em')
	.attr('text-anchor', 'middle')
	.text(function(d) { return d.z; })
	.attr('x', function(d) {
	    if (prevScales) {
		return prevScales.x(d.x);
	    }
	    return scales.x(d.x);
	})
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d) { return scales.x(d.x); });

    tooltipText.attr('y', function(d) { return scales.y(d.y) - scales.z(d.z)/2 - TOOLTIP_HEIGHT/2; })
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d) { return scales.x(d.x); });

    if (prevScales) {
	tooltipText.exit()
	    .transition()
	    .duration(ANIMATION_DURATION)
	    .attr('x', function(d) { return scales.x(d.x); })
	    .remove();
    }
    else {
	tooltipText.exit()
	    .remove();
    }
};


fretboard.destroy = function(el) {

};

function alignx(x){
    return x - (x % 1);
}
//this.alignon = alignx;

function aligny(x){
    return x - (x % 1) + 0.5;
}
//this.alignin = aligny;

module.exports = fretboard;
