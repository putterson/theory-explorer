import { SELECT_NOTE, UNSELECT_NOTE } from '../actions/ActionTypes'

const selectednotes = (state = {}, action) => {
    switch (action.type) {
        case SELECT_NOTE:
            let selected = { [action.id]: true }
            return Object.assign({},
                state,
                selected
            );
        case UNSELECT_NOTE:
            let unselected = { [action.id]: undefined }
            return Object.assign({},
                state,
                unselected
            );
        default:
            return state
    }
}

export default selectednotes
