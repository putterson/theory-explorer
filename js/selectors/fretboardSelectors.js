import { createSelector, createStructuredSelector } from 'reselect'
import Board from '../stores/Board'

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
};

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
  (tuning) => {
    return Board.getStrings(tuning)
  }
)

const visibleNoteMarkerSelector = createSelector(
  tuningSelector,
  keySelector,
  viewhintSelector,
  (tuning, key, viewhints) => {
    var getNoteMarkersInRange = (string) => {
      return Board.getNoteMarkers(string, viewhints.fret_start, viewhints.fret_end).filter((marker) => {return Board.isIntervalInScale(Board.getModInterval(key,marker.note))}).map((marker) => {(marker['id'] = Board.getModInterval(key,marker.note) + Board.getDivInterval(key,marker.note) + string.note + string.octave); return marker})
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
