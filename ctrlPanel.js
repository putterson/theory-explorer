function ctrlPanel(board, theory) {
	var div;
	var sel_tuning;
	var sel_scale;
	var current_key = "E";
	var current_tuning = "Standard";
	
	function construct(){
		div = document.getElementById("ctrlContainer");
		con_tunings();
		con_scales();
	}
	
	function con_tunings(){
		sel_tuning = document.createElement("select");
		sel_tuning.setAttribute("onChange","controller.select_tuning(value)");
		for (var tuning in theory.tunings){
			var opt = document.createElement("option");
			opt.textContent = tuning + "  (" + theory.tunings[tuning] + ")";
			opt.value = tuning;
			sel_tuning.appendChild(opt);
		}
		div.appendChild(sel_tuning);
	}
	
	function con_scales(){
		sel_scale = document.createElement("select");
		sel_scale.setAttribute("onChange","");
		for (var scale in theory.scales){
			var opt = document.createElement("option");
			opt.textContent = scale ;
			opt.value = scale;
			sel_scale.appendChild(opt);
		}
		div.appendChild(sel_scale);
	}
	
	this.select_tuning = function(tuning){
		current_tuning = tuning;
		board.update_notes(function(elem, args){
			alert(theory.tones.indexOf(theory.tunings[current_tuning][args.s]));
			//var note = (theory.notes.indexOf((theory.tunings[current_tuning])[args.s]) + args.i) % 12;
			//elem[1].innerText(theory.notes[note]);
			return elem;
		});
	}
	
	this.select_scale = function(scale){
		board.update_notes(function(elem, args){
		});
	}
	
	construct();
	
}