
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
		  octave: 3 },
		{ note: "D",
		  octave: 3 },
		{ note: "A",
		  octave: 2 },
		{ note: "E",
		  octave: 2 }]}
];

export default {
    getFrets(s,e) {
	var frets = [];
	for(var i = s; i <= e; i++){
	    frets.push({n: i});
	}
	return frets;
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
