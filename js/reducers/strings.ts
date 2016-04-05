import Board from '../stores/Board'
const strings = (state = Board.getStrings(Board.getDefaultTuning()), action) => {
  switch (action.type) {
  case 'SET_TUNING':
    return Board.getStrings(Board.getTuning(action.name))
  default:
    return state
  }
}

export default strings
