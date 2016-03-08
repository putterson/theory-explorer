import { createSelector, createStructuredSelector } from 'reselect'
import Board from '../stores/Board'

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

const visibleFretboardSelector = createStructuredSelector({
  frets: visibleFretSelector,
  fretmarkers: visibleFretMarkerSelector,
  strings: visibleStringSelector,
  viewhints: viewhintSelector
})


export default visibleFretboardSelector
