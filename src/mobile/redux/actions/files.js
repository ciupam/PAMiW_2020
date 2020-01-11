import * as apiUtils from '../utils/files'
import { setButtonLoading } from './buttonLoading'
import { isTokenExpired, getToken } from '../utils/session'
import { receiveCurrentUser } from './session'

export const ADD_FILES = 'ADD_FILES'
export const CONCAT_FILE = 'CONCAT_FILE'
export const CLEAN_FILES = 'CLEAN_FILES'
export const REMOVE_FILE = 'REMOVE_FILE'

export const addFiles = session => async dispatch => {
    const response = await apiUtils.getFiles(session)
    const fileData = await response.json()

    if (response.ok) return dispatch({
        type: ADD_FILES,
        fileData
    })
}

export const concatFile = (session, file) => async dispatch => {
    const formData = new FormData()
    formData.append('file', file)

    dispatch(setButtonLoading(true))

    const accessToken = session.accessToken
    const expired = await isTokenExpired(session.accessToken)

    if (expired) {
        const response = await getToken(session.refreshToken)
        const data = await response.json()
        if (response.ok) {
            accessToken = data.accessToken
            dispatch(receiveCurrentUser({
                ...session,
                accessToken
            }))
        }
    }

    const response = await apiUtils.addFile({
        userId: session.userId,
        accessToken
    }, formData)
    
    const fileData = await response.json()

    dispatch(setButtonLoading(false))

    if (response.ok) dispatch({
        type: CONCAT_FILE,
        fileData
    })
}

export const cleanFiles = () => ({
    type: CLEAN_FILES
})