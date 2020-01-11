import { ADD_FILES, CONCAT_FILE, CLEAN_FILES } from '../actions/files'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, { type, fileData }) => {
    Object.freeze(state)
    switch (type) {
        case ADD_FILES:
            return fileData
        case CLEAN_FILES:
            return []
        case CONCAT_FILE:
            if (state.filter(file => file.name === fileData.name).length === 0) return [...state, fileData]
        default:
            return state
    }
}