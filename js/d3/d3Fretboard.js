var EventEmitter = require('events').EventEmitter;
var d3 = require('d3');

var fretboard = {};

var ANIMATION_DURATION = 500;


fretboard.create = function(el, props) {
    var svg = d3.select(el).append('svg')
	    .attr('class', 'd3-fretboard')
	    .attr('width', props.viewhints.width)
	    .attr('height', props.viewhints.height);


    svg.append('g')
	.attr('class', 'd3-frets');

    svg.append('g')
	.attr('class', 'd3-fret-numbers');

    svg.append('g')
	.attr('class', 'd3-fret-markers');
    
    svg.append('g')
	.attr('class', 'd3-strings');

    svg.append('g')
	.attr('class', 'd3-string-notes');

    
    var dispatcher = new EventEmitter();
    this.update(el, props, dispatcher);

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
	    var twroottwo = 1.059463094;
	    var divisor = 17.817154;
	    
	    var stringwidth = bwidth;
	    var pos = 1/(Math.pow(twroottwo, i) * stringwidth);
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
	viewhints: viewhints,
	getFretPosition: getFretPosition
    };
};

fretboard.update = function(el, state, dispatcher) {
    var svg = d3.select(el).selectAll('.d3-fretboard');
    var dimentions = this.getDimentions(el,state);
    this._drawFrets(el, dimentions, state.frets);
    this._drawFretNumbers(el, dimentions, state.frets);
    this._drawFretMarkers(el, dimentions, state.fretmarkers);
    this._drawStrings(el, dimentions, state.strings);
    this._drawStringNotes(el, dimentions, state.strings);

};



//dim is dimentions
fretboard._drawStrings = function(el, dim, strings) {
    var g = d3.select(el).selectAll('.d3-strings');
    


    var stringwidth = 0.5;



    var nstrings = strings.length;

    var string = g.selectAll('line')
	    .data(strings, function(s) {return s.note+'-'+s.octave;});

    var stringStyle = function(d,i) { 
	var dashed = "";
	if (i > 2) {
	    dashed = "stroke-dasharray: 1.5,0.5;";
	}						
	return "stroke-width: " + (1 + (i*stringwidth)) + "px;" + "stroke: black;" + dashed;};
    
    //update existing strings
    string
    	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x1', alignx(dim.lpad))
	.attr('y1', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
	.attr('x2', function(d,i) {return alignx(dim.lpad + dim.bwidth);})
	.attr('y2', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr('style', stringStyle);

    //add any new strings
    string.enter().append('line')
       	.transition()
	.duration(ANIMATION_DURATION)
	.attr('class', 'd3-string')
	.attr('x1', alignx(dim.lpad))
	.attr('y1', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
	.attr('x2', function(d,i) {return alignx(dim.lpad + dim.bwidth);})
	.attr('y2', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr('style', stringStyle);

    //remove any extra strings
    string.exit()
	.remove();
};

fretboard._drawStringNotes = function(el, dim, strings) {
    var g = d3.select(el).selectAll('.d3-string-notes');

    var nstrings = strings.length;
    
    var note = g.selectAll('text')
	    .data(strings, function(s) {return s.note+'-'+s.octave;});

    note
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d,i) {return alignx(dim.lpad / 3);})
	.attr('y', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "middle")
	.text( function(d,i) { return d.note+d.octave; });

    note.enter().append('text')
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('x', function(d,i) {return alignx(dim.lpad / 3);})
	.attr('y', function(d,i) {return aligny(i*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
    	.attr("alignment-baseline", "middle")
	.text( function(d,i) { return d.note+d.octave; });

    note.exit()
	.remove();
};


fretboard._drawFrets = function(el, dim, raw_frets) {    
    var g = d3.select(el).selectAll('.d3-frets');

    var frets = raw_frets.filter(function(f){
	return f.n <= dim.viewhints.fret_end &&
	    f.n >= dim.viewhints.fret_start;
    });
    
    var fret = g.selectAll('line')
	    .data(frets,function(f){return f.n;});
    
    var fretStyle = function(d, i) {
	var width;
	if(d.n === 0){
	    width = "6px";
	}else {
	    width = "2px";
	}
	return "stroke-width: "+width+"; stroke: black;";
    };


    fret.exit()
	.remove();

    //Update existing frets
    fret
    	.transition()
	.duration(ANIMATION_DURATION)
	.attr("x1", dim.getFretPosition())
    	.attr("y1", aligny(dim.tpad))
	.attr("x2", dim.getFretPosition())
	.attr("y2", aligny(dim.tpad+dim.bheight))
	.attr('style', fretStyle);

    //Add any new frets
    fret.enter().append('line')
       	.transition()
	.duration(ANIMATION_DURATION)
	.attr("x1", dim.getFretPosition())
    	.attr("y1", aligny(dim.tpad))
	.attr("x2", dim.getFretPosition())
	.attr("y2", aligny(dim.tpad+dim.bheight))
    	.attr('style', fretStyle);


};

fretboard._drawFretNumbers = function(el, dim, raw_frets) {
    var g = d3.select(el).selectAll('.d3-fret-numbers');

    var frets = raw_frets.filter(function(f){
	return f.n <= dim.viewhints.fret_end &&
	    f.n >= dim.viewhints.fret_start;
    });
    
    var num = g.selectAll('text')
	    .data(frets, function(f){return f.n;});

    num.exit()
	.remove();
    
    num
	.transition()
	.duration(ANIMATION_DURATION)
	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
	.attr("x", dim.getFretPosition())
	.attr("y", dim.tpad - 10)
	.text(function(d,i) {return d.n;});

    num.enter().append('text')
       	.transition()
	.duration(ANIMATION_DURATION)
    	.attr("fill", "#000000")
	.attr("font-family", "Monospace")
	.attr("font-size", 10)
	.attr("text-anchor", "middle")
    	.attr("x", dim.getFretPosition())
	.attr("y", dim.tpad - 10)
	.text(function(d,i) {return d.n;});



};

fretboard._drawFretMarkers = function(el, dim, raw_markers) {
    var g = d3.select(el).selectAll('.d3-fret-markers');

    var markers = raw_markers.filter(function(f){
	return f.f <= dim.viewhints.fret_end &&
	    f.f >= dim.viewhints.fret_start;
    });
    
    var marker = g.selectAll('circle')
	    .data(markers, function(f){return f.n+"-"+f.y;});

    marker.exit()
	.remove();
    
    marker
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('cx', dim.getFretPosition())
	.attr('cy', function(d,i){return dim.bheight * d.y + dim.tpad;})
	.attr('r', dim.bheight * 0.03 )
	.attr('fill', "#999999");

    marker.enter().append('circle')
    	.attr('fill', "#999999")
	.transition()
	.duration(ANIMATION_DURATION)
	.attr('cx', dim.getFretPosition())
	.attr('cy', function(d,i){return dim.bheight * d.y + dim.tpad;})
	.attr('r', dim.bheight * 0.03 );


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
