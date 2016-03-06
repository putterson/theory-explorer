import Board from '../stores/Board'
const tuning = (state = Board.getDefaultTuning(), action) => {
  switch (action.type) {
  case 'SET_TUNING':
    return Board.getTuning(action.name)
  default:
    return state
  }
}

export default tuning
