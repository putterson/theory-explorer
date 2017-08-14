import { Note, Tuning, PitchClass, NoteMarker } from '../stores/Board'
import * as d3 from 'd3'


var EventEmitter = require('events').EventEmitter;

let fretboard : any = {};

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

  svg.append('g')
    .attr('class', 'd3-note-markers');

  svg.append('g')
    .attr('class', 'd3-note-marker-text');
  
  var dispatcher = new EventEmitter();
  this.update(el, props, dispatcher);

  return dispatcher;
};

fretboard.getDimentions = function(el, state) {
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var lpad = 35;
  var rpad = 25;
  var tpad = height* .20;
  var bpad = height* .10;
  var viewhints= state.viewhints;
  var bwidth = width  - lpad - rpad;
  var bheight = height - tpad - bpad;

  var notemarkerRadius = bheight * 0.07

  function calcFretPosition(i) {
    //https://en.wikipedia.org/wiki/Scale_length_(string_instruments)
    //12throot(2) / (12throot(2) - 1)
    var twroottwo = 1.059463094;
    var divisor = 17.817154;
    
    var stringwidth = bwidth;
    var pos = 1/(Math.pow(twroottwo, i) * stringwidth);
    return pos;	
  }
  
  var getFretPosition = function(){
    return function(d,i){
      var start_position = calcFretPosition(viewhints.fret_start);
      var end_position = calcFretPosition(viewhints.fret_end);
      return (calcFretPosition(d.n) - start_position) / (end_position - start_position) * bwidth + lpad;
    };
  };

  var getNoteMarkerPosition = () => {
    return (d,i) => {
      var start_position = calcFretPosition(viewhints.fret_start);
      var end_position = calcFretPosition(viewhints.fret_end);
      if(d.fret === 0){
	return (calcFretPosition(d.fret) - start_position) / (end_position - start_position) * bwidth + lpad;
      } else {
	return (calcFretPosition(d.fret) - start_position) / (end_position - start_position) * bwidth + lpad - (notemarkerRadius * 1.5);
      }
    }
  }
  
  return {
    lpad: lpad,
    rpad: rpad,
    tpad: tpad,
    bpad: bpad,
    bwidth: bwidth,
    bheight: bheight,
    notemarkerRadius: notemarkerRadius,
    viewhints: viewhints,
    getFretPosition: getFretPosition,
    getNoteMarkerPosition: getNoteMarkerPosition
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
  this._drawStringNoteMarkers(el, dimentions, state.notemarkers, state.strings);
  this._drawStringNoteMarkerText(el, dimentions, state.notemarkers, state.strings);
};



//dim is dimentions
fretboard._drawStrings = function(el, dim, strings : Array<Note>) {
  var g = d3.select(el).selectAll('.d3-strings');
  


  var stringwidth = 0.5;



  var nstrings = strings.length;

  var string = g.selectAll('line')
	.data(strings, function(s: Note) {return s.pitch.id+'-'+s.octave;});

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

fretboard._drawStringNotes = function(el, dim, strings: Array<Note>) {
  var g = d3.select(el).selectAll('.d3-string-notes');

  var nstrings = strings.length;
  
  var note = g.selectAll('text')
	.data(strings, function(s : Note) {return s.pitch.id+'-'+s.octave;});

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
    .text( function(d : Note,i) { return d.pitch.name+d.octave; });

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
    .text( function(d : Note,i) { return d.pitch.name+d.octave; });

  note.exit()
    .remove();
};

fretboard._drawStringNoteMarkers = function(el, dim, markers : any, strings : Array<Note>) {
  var g = d3.select(el).selectAll('.d3-note-markers');

  var nstrings = strings.length;
  
  var marker = g.selectAll('circle')
	.data(markers, function(m : any,i) {return m.id});

  marker
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('cx', dim.getNoteMarkerPosition())
    .attr('cy', function(d ,i) {return aligny(strings.indexOf(d.string)*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    .attr('r', dim.notemarkerRadius)
    .attr("fill", "#FFAADD")
    .attr('fill-opacity', 0.8)
    .attr('stroke', '#000000');
  

  marker.enter().append('circle')
    .attr('opacity', 0)
    // .on('click', function () {
      
    // })
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('cx', dim.getNoteMarkerPosition())
    .attr('cy', function(d,i) {return aligny(strings.indexOf(d.string)*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    .attr('r', dim.notemarkerRadius)
    .attr('opacity', 1)
    .attr("fill", "#FFAADD")
    .attr('fill-opacity', 0.8)
    .attr('stroke', '#000000');

  marker.exit()
    .remove();
};

fretboard._drawStringNoteMarkerText = function(el,dim,markers : Array<NoteMarker> ,strings : Array<Note>) {
  var g = d3.select(el).selectAll('.d3-note-marker-text');

  var nstrings = strings.length;
  
  var note = g.selectAll('text')
	.data(markers, function(m ,i) {return m.id});

  note
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('x', dim.getNoteMarkerPosition())
    .attr('y', function(d,i) {return aligny(strings.indexOf(d.string)*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    .attr("font-family", "Monospace")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text( function(d : NoteMarker ,i) { return d.note.pitch.name });

  note.enter().append('text')
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('x', dim.getNoteMarkerPosition())
    .attr('y',  function(d,i) {return aligny(strings.indexOf(d.string)*(dim.bheight/(nstrings - 1)) + dim.tpad);})
    .attr("font-family", "Monospace")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text( function(d : NoteMarker ,i) { return d.note.pitch.name });

  note.exit()
    .remove();
}


fretboard._drawFrets = function(el, dim, frets) {    
  var g = d3.select(el).selectAll('.d3-frets');

  var fret = g.selectAll('line')
	.data(frets,function(f : any){return f.n;});
  
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

fretboard._drawFretNumbers = function(el, dim, frets) {
  var g = d3.select(el).selectAll('.d3-fret-numbers');

  
  var num = g.selectAll('text')
	.data(frets, function(f : any){return f.n;});

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
    .attr("y", dim.tpad - 15)
    .text(function(d,i) {return d.n;});

  num.enter().append('text')
    .transition()
    .duration(ANIMATION_DURATION)
    .attr("fill", "#000000")
    .attr("font-family", "Monospace")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .attr("x", dim.getFretPosition())
    .attr("y", dim.tpad - 15)
    .text(function(d,i) {return d.n;});



};

fretboard._drawFretMarkers = function(el, dim, markers) {
  var g = d3.select(el).selectAll('.d3-fret-markers');
  
  var marker = g.selectAll('circle')
	.data(markers, function(f : any){return f.n+"-"+f.y;});

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
	.data(data, function(d: any) { return d.id; });

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

export default fretboard;
