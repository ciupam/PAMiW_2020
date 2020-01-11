import { SET_BUTTON_LOADING } from '../actions/buttonLoading'

const INITIAL_STATE = false

export default (state = INITIAL_STATE, { type, loading }) => {
    Object.freeze(state)
    switch (type) {
        case SET_BUTTON_LOADING:
            return loading
        default:
            return state
    }
}