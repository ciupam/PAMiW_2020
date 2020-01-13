import { ADD_USER_POST, GET_USER_POSTS, DELETE_USER_POST } from '../actions/posts'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, { type, postData }) => {
    Object.freeze(state)
    switch (type) {
        case GET_USER_POSTS:
            return postData
        case ADD_USER_POST:
            return [...state, postData]
        case DELETE_USER_POST:
            return state.filter(el => el._id !== postData)
        default:
            return state
    }
}