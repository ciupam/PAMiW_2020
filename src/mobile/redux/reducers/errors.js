import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/errors'
import { RECEIVE_CURRENT_USER } from '../actions/session'

export default (state = '', { type, message }) => {
    Object.freeze(state)
    switch (type) {
        case RECEIVE_ERRORS:
            return message
        case RECEIVE_CURRENT_USER:
        case CLEAR_ERRORS:
            return ''
        default:
            return state
    }
}