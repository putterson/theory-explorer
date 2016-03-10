import Board from '../stores/Board'
const key = (state = Board.getKey(0), action) => {
  switch(action.type) {
  case 'SET_KEY':
    return Board.getKey(action.id)
  default:
    return state
  }
}

export default key
