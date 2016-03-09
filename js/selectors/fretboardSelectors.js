import { createSelector, createStructuredSelector } from 'reselect'
import Board from '../stores/Board'

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
};

const viewhintSelector = state => state.viewhints
const tuningSelector = state => state.tuning

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
  (tuning) => {
    return Board.getStrings(tuning)
  }
)

const visibleNoteMarkerSelector = createSelector(
  tuningSelector,
  viewhintSelector,
  (tuning, viewhints) => {
    var getNoteMarkersInRange = (string) => {
      return Board.getNoteMarkers(string, viewhints.fret_start, viewhints.fret_end)
    }
    
    return tuning.strings.flatMap(getNoteMarkersInRange)
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
