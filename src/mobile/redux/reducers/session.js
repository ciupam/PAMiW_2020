import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session'

const INITIAL_STATE = { userId: null, firstname: null, lastname: null, accessToken: null, refreshToken: null }

export default (state = INITIAL_STATE, { type, user }) => {
    Object.freeze(state)
    switch (type) {
        case RECEIVE_CURRENT_USER:
            return user
        case LOGOUT_CURRENT_USER:
            return INITIAL_STATE
        default:
            return state
    }
}