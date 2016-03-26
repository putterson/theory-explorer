
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

interface PitchClass {
    name : string;
    id : number;
}

interface Note {
    class : PitchClass;
    octave : number;
}

var tones = {
  length : 12,
  names : {
    sharps : ["A","A♯","B","C","C♯","D","D♯","E","F","F♯","G","G♯"],
    flats  : ["A","B♭","B","C","D♭","D","E♭","E","F","G♭","G","A♭"]
  }
};

//holds semitonal degrees used for each scale starting from the root
var scales = {
  "Pentatonic"    : [0,2,4,7,9],
  "Major"         : [0,2,4,5,7,9,11],
  "Natural Minor" : [0,2,3,5,7,8,10]
};

  
function getPitchClasses() : Array<PitchClass> {
  return tones.names.sharps.map((name, i) => {return {name: name, id: i}})
};

function getPitchClassById(n : number) : PitchClass {
    //Assume that ids are unique
    return getPitchClasses().filter((pitch) => {return pitch.id === n}).pop()
};

function getPitchClassByName(n : string) : PitchClass {
    //Assume that ids are unique
    return getPitchClasses().filter((pitch) => {return pitch.name === n}).pop()
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
    let pitchClasses = getPitchClasses();
    var markers = []
    for(var i = s; i <= e; i++){
      console.log("Fret " + i)
      markers.push({fret: i,
		    //TODO: make this string id
		    string: string,
            //Assumes that markers are one pitch class away from eachother
		    note: getPitchClassById(getPitchClassByName(string.note).id + i % pitchClasses.length)
    })}
    return markers
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
  },

  getKeys() {
    return getPitchClasses()
  },

  getKey(id) {
    return getPitchClassById(id)
  },

  getModInterval(base_note : Note, interval_note : Note) {
    let lengthPitchClasses = getPitchClasses.length
    return (interval_note.class.id + lengthPitchClasses - base_note.class.id) % 12
  },

  getDivInterval(base_note : Note, interval_note : Note) {
    let lengthPitchClasses = getPitchClasses.length
    return interval_note.octave - base_note.octave
  },

  isIntervalInScale(interval, scale = scales.Major) {
    return scale.filter((n) => interval === n).length > 0
  }
};
