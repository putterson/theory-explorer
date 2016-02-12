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
    
    var dispatcher = new EventEmitter();
    this.update(el, state, dispatcher);

    return dispatcher;
};

fretboard.update = function(el, state, dispatcher) {
    var svg = d3.select(el).selectAll('.d3-fretboard');
    console.log("d3-fretboard update");
    this._drawStrings(el, state.strings);
};

fretboard._drawStrings = function(el, strings) {
    var g = d3.select(el).selectAll('.d3-strings');
    
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    console.log(width);
    
    var stringwidth = 0.4;

    var lpad = 25;
    var rpad = 25;
    var tpad = height* .20;
    var bpad = height* .10;
    var bwidth  = width  - lpad - rpad;
    var bheight = height - tpad - bpad;

    var nstrings = strings.length;

    var string = g.selectAll('line')
	.data(strings);//, function(s) {return s.note+'-'+s.octave+'-'+width;});

    //update existing strings
    string
	.attr('x1', alignx(lpad))
	.attr('y1', function(d,i) {return aligny(i*(bheight/(nstrings - 1)) + tpad)})
	.attr('x2', function(d,i) {return alignx(lpad + bwidth) })
	.attr('y2', function(d,i) {return aligny(i*(bheight/(nstrings - 1)) + tpad)})
    	.attr('style', function(d,i) { return "stroke-width: " + (1 + (i*stringwidth)) + "px;" + "stroke: black;"});

    //add any new strings
    string.enter().append('line')
	.attr('class', 'd3-string')
	.attr('x1', alignx(lpad))
	.attr('y1', function(d,i) {return aligny(i*(bheight/(nstrings - 1)) + tpad)})
	.attr('x2', function(d,i) {return alignx(lpad + bwidth) })
	.attr('y2', function(d,i) {return aligny(i*(bheight/(nstrings - 1)) + tpad)})
    	.attr('style', function(d,i) { return "stroke-width: " + (1 + (i*stringwidth)) + "px;" + "stroke: black;"});

    //remove any extra strings
    string.exit().remove();
}


fretboard._drawFrets = function(el, frets) {

}

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
