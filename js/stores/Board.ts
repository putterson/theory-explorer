export interface PitchClass {
    name : string;
    id : number;
}

export interface Note {
    pitch : PitchClass;
    octave : number;
}

export interface Scale {
    name: string;
    degrees: Array<number>;
}

export interface Chord {
  name: string;
  formula: Array<number>
}

export interface Tuning {
    name : string;
    strings : Array<Note> 
}

export interface NoteMarker {
    fret: number;
    string: Note;
    note: Note;
    id: string;
    selected: boolean;
    selectable: boolean;
}

var tones = {
  length : 12,
  names : {
    sharps : ["A","A♯","B","C","C♯","D","D♯","E","F","F♯","G","G♯"],
    flats  : ["A","B♭","B","C","D♭","D","E♭","E","F","G♭","G","A♭"]
  }
};

var tunings : Array<Tuning> = [
  { name: "Standard",
    strings: [{ pitch: "E",
		octave: 4 },
	      { pitch: "B",
		octave: 3 },
	      { pitch: "G",
		octave: 3 },
	      { pitch: "D",
		octave: 3 },
	      { pitch: "A",
		octave: 2 },
	      { pitch: "E",
		octave: 2 }]},
  { name: "Drop D",
    strings: [{ pitch: "E",
		octave: 4 },
	      { pitch: "B",
		octave: 3 },
	      { pitch: "G",
		octave: 3 },
	      { pitch: "D",
		octave: 3 },
	      { pitch: "A",
		octave: 2 },
	      { pitch: "D",
		octave: 2 }]},
  { name: "7-String",
    strings: [{ pitch: "E",
		octave: 4 },
	      { pitch: "B",
		octave: 3 },
	      { pitch: "G",
		octave: 3 },
	      { pitch: "D",
		octave: 3 },
	      { pitch: "A",
		octave: 2 },
	      { pitch: "E",
		octave: 2 },
	      { pitch: "B",
		octave: 2 }]},
  { name: "Standard Bass",
    strings: [{ pitch: "G",
		octave: 2 },
	      { pitch: "D",
		octave: 2 },
	      { pitch: "A",
		octave: 1 },
	      { pitch: "E",
		octave: 1 }]}
].map((t) => {return {
    name: t.name,
    strings: t.strings.map((s) => {return {
        pitch: getPitchClassByName(s.pitch),
        octave: s.octave
    }})
}});

//holds semitonal degrees used for each scale starting from the root
var scales : Array<Scale> = [
    { name : "Pentatonic",
      degrees: [0,2,4,7,9]},
    { name : "Major",
      degrees : [0,2,4,5,7,9,11]},
    { name : "Natural Minor",
      degrees : [0,2,3,5,7,8,10]}
];

var chords: Array<Chord> = [
  {
    name: "Major",
    formula: [0, 3, 5]
  },
  { name: "Minor",
    formula: [0, 2, 5]}
]

  
function getPitchClasses() : Array<PitchClass> {
  return tones.names.sharps.map((name, i) => {return {name: name, id: i}})
};

function getPitchClassById(n : number) : PitchClass {
    //Assume that ids are unique
    return getPitchClasses().filter((pitch) => {return pitch.id === n}).shift()
};

function getPitchClassByName(n : string) : PitchClass {
    //Assume that ids are unique
    return getPitchClasses().filter((pitch) => {return pitch.name === n}).shift()
};

function getFrets(s,e) {
    var frets = [];
    for(var i = s; i <= e; i++){
      frets.push({n: i});
    }
    return frets;
  }

  function getFretMarkers(s,e) {
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
  }


  function getNoteMarkers(string: Note, s, e): Array<NoteMarker> {
    let pitchClasses = getPitchClasses();
    var markers: Array<NoteMarker> = []
    for (var i = s; i <= e; i++) {
      markers.push({
        fret: i,
        //TODO: make this string id
        string: string,
        //Assumes that markers are one pitch class away from eachother
        note: {
          pitch: getPitchClassById((string.pitch.id + i) % pitchClasses.length),
          octave: string.octave + Math.floor((i + string.pitch.id) / 12)
        },
        id: "",
        selected: true,
        selectable: false
      })
    }
    return markers
  }

  function getDefaultTuning() {
    return this.getTuning("Standard");
  }

  function getStrings(tuning) {
    return tunings.filter( (value) => value.name === tuning.name )[0].strings;
  }

  function getTunings() {
    return tunings;
  }

  function getTuning(tuningName) {
    return tunings.filter( (value) => value.name === tuningName )[0];
  }

  function getKeys() {
    return getPitchClasses()
  }

  function getKey(id) {
    return getPitchClassById(id)
  }

  function getModInterval(note_one : Note, note_two : Note) : number {
    let lengthPitchClasses = getPitchClasses.length
    return getInterval(note_one, note_two) % lengthPitchClasses
  }
  
  function getInterval(note_one : Note, note_two : Note) : number {
    let lengthPitchClasses = getPitchClasses().length
    let p1 = ((note_one.octave * lengthPitchClasses) + note_one.pitch.id)
    let p2 =  ((note_two.octave * lengthPitchClasses) + note_two.pitch.id)
    return Math.abs( p1 - p2 )
                   
  }

  function getDivInterval(note_one : Note, note_two : Note) {
    return Math.floor(getInterval(note_one, note_two) / 12)
  }

  function isIntervalInScale(interval : number, scale : Scale) {
    return scale.degrees.filter((n) => interval === n).length > 0
  }
  
  function isPitchInScale(key : PitchClass, pitch : PitchClass, scale : Scale) {
    let interval = (pitch.id + 12 - key.id) % 12
    return scale.degrees.filter((n) => n === interval).length > 0
  }
  
  function getScale(name : string) {
      return getScales().filter((s) => s.name === name)[0]
  }
  
  function getScales() : Array<Scale> {
      return scales
  }

export default {
    getPitchClasses,
    getPitchClassById,
    getPitchClassByName,
    getFrets,
    getFretMarkers,
    getNoteMarkers,
    getDefaultTuning,
    getTunings,
    getTuning,
    getStrings,
    getKeys,
    getKey,
    getModInterval,
    getInterval,
    getDivInterval,
    isIntervalInScale,
    isPitchInScale,
    getScale,
    getScales
};
