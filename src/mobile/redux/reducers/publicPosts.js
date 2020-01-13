import { GET_PUBLIC_POSTS } from '../actions/posts'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, { type, posts }) => {
    Object.freeze(state)
    switch (type) {
        case GET_PUBLIC_POSTS:
            return posts
        default:
            return state
    }
}