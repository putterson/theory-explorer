
var tunings = [
  { name: "Standard",
    strings: [{ note: "E",
		octave: 4 },
	      { note: "B",
		octave: 3 },
	      { note: "G",
		octave: 3 },
	      { note: "D",
		octave: 3 },
	      { note: "A",
		octave: 2 },
	      { note: "E",
		octave: 2 }]},
  { name: "Drop D",
    strings: [{ note: "E",
		octave: 4 },
	      { note: "B",
		octave: 3 },
	      { note: "G",
		octave: 3 },
	      { note: "D",
		octave: 3 },
	      { note: "A",
		octave: 2 },
	      { note: "D",
		octave: 2 }]},
  { name: "7-String",
    strings: [{ note: "E",
		octave: 4 },
	      { note: "B",
		octave: 3 },
	      { note: "G",
		octave: 3 },
	      { note: "D",
		octave: 3 },
	      { note: "A",
		octave: 2 },
	      { note: "E",
		octave: 2 },
	      { note: "B",
		octave: 2 }]},
  { name: "Standard Bass",
    strings: [{ note: "G",
		octave: 2 },
	      { note: "D",
		octave: 2 },
	      { note: "A",
		octave: 1 },
	      { note: "E",
		octave: 1 }]}
];

var tones = {
  sharps : ["A","A♯","B","C","C♯","D","D♯","E","F","F♯","G","G♯"],
  flats  : ["A","B♭","B","C","D♭","D","E♭","E","F","G♭","G","A♭"]
};

//holds semitonal degrees used for each scale starting from the root
var scales = {
  "Pentatonic"    : [0,2,4,7,9],
  "Major"         : [0,2,4,5,7,9,11],
  "Natural Minor" : [0,2,3,5,7,8,10]
};

export default {
  getFrets(s,e) {
    var frets = [];
    for(var i = s; i <= e; i++){
      frets.push({n: i});
    }
    return frets;
  },

  getFretMarkers(s,e) {
    var markers = [];
    for(var i = s; i <= e; i++){
      if(i > 1 && i % 2 == 1 && (i+1) % 12 != 0 && (i-1) % 12 != 0){
	markers.push({n: i - 0.5,
		      f: i,
		      y: 0.5});
      }else if(i > 1 && i % 12 == 0) {
	markers.push({n: i - 0.5,
		      f: i,
		      y: (1/3)});
	markers.push({n: i - 0.5,
		      f: i,
		      y: (2/3)});
	
      }
    }
    return markers;
  },

  getNoteMarkers(string, s, e) {
    var markers = []
    var key = "C"
    for(var i = s; i <= e; i++){
      markers.push({fret: i,
		    //TODO: make this string id
		    string: string,
		    note: tones.sharps[(tones.sharps.indexOf(string.note) + i) % tones.sharps.length]})
    }
    return markers.filter((m) => scales.Major.includes((tones.sharps.indexOf(m.note) + 12  - tones.sharps.indexOf(key)) % 12 ) ).filter((m) => m.fret >= 8 && m.fret <= 12)
  },

  getDefaultTuning() {
    return this.getTuning("Standard");
  },

  getStrings(tuning) {
    return tunings.filter( (value) => value.name === tuning.name )[0].strings;
  },

  getTunings() {
    return tunings;
  },

  getTuning(tuningName) {
    return tunings.filter( (value) => value.name === tuningName )[0];
  }
};
