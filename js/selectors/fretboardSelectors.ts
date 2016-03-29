const { createSelector, createStructuredSelector } = require('reselect')
import Board, {Tuning, Note, PitchClass} from '../stores/Board';

interface NoteMarker {
    
}

let flatMap = (arr : Array<any>, lambda) => Array.prototype.concat.apply([], arr.map(lambda)); 

const viewhintSelector = state => state.viewhints
const tuningSelector = state => state.tuning
const keySelector = state => state.key

const visibleFretSelector = createSelector(
  viewhintSelector,
  (viewhints) => {
    return Board.getFrets(viewhints.fret_start, viewhints.fret_end)
  }
)

const visibleFretMarkerSelector = createSelector(
  viewhintSelector,
  (viewhints) => {
    return Board.getFretMarkers(viewhints.fret_start, viewhints.fret_end)
  }
)

const visibleStringSelector = createSelector(
  tuningSelector,
  (tuning : Tuning) => {
    return Board.getStrings(tuning)
  }
)

const visibleNoteMarkerSelector = createSelector(
  tuningSelector,
  keySelector,
  viewhintSelector,
  (tuning: Tuning, key : PitchClass, viewhints) : Array<NoteMarker> => {
    var getNoteMarkersInRange = (string : Note) => {
      return Board.getNoteMarkers(string, viewhints.fret_start, viewhints.fret_end)
	.filter((marker) => {return Board.isPitchInScale(key, marker.note.pitch)})
	.map((marker) =>
	     {(marker['id'] = Board.getInterval(string,marker.note) + "");
	      console.log(marker['id']);
	      return marker})
    }
    
    return flatMap(tuning.strings, getNoteMarkersInRange)
  }
)

const visibleFretboardSelector = createStructuredSelector({
  frets: visibleFretSelector,
  fretmarkers: visibleFretMarkerSelector,
  notemarkers: visibleNoteMarkerSelector,
  strings: visibleStringSelector,
  viewhints: viewhintSelector
})


export default visibleFretboardSelector
