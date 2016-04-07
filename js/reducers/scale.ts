import Board from '../stores/Board'
const scale = (state = Board.getScale("Major"), action) => {
  switch(action.type) {
  case 'SET_SCALE':
    return Board.getScale(action.id)
  default:
    return state
  }
}

export default scale
