function musicTheory(){
	this.tunings = {
		"Standard" : ["E","A","D","G","B","E"],
		"Drop D"   : ["D","A","D","G","B","E"],
	};
	
	this.tones = {
		"Sharps" : ["A","A♯","B","C","C♯","D","D♯","E","F","F♯","G","G♯"],
		"Flats"  : ["A","B♭","B","C","D♭","D","E♭","E","F","G♭","G","A♭"]
	};
	
	//holds semitonal degrees used for each scale starting from the root
	this.scales = {
		"Pentatonic"    : [0,2,4,7,9],
		"Major"         : [0,2,4,5,7,9,11],
		"Natural Minor" : [0,2,3,5,7,8,10]
	};
}
