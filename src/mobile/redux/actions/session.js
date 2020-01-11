import * as apiUtils from '../utils/session'
import { receiveErrors } from './errors'
import { setButtonLoading } from './buttonLoading'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const login = user => async dispatch => {
    dispatch(setButtonLoading(true))

    const response = await apiUtils.login(user)
    const data = await response.json()

    dispatch(setButtonLoading(false))

    if (response.ok) return dispatch(receiveCurrentUser(data))

    return dispatch(receiveErrors(data))
}

export const logout = () => async dispatch => {
    dispatch(setButtonLoading(true))

    const response = await apiUtils.logout()
    const data = await response.json()

    dispatch(setButtonLoading(false))

    if (response.ok) return dispatch(logoutCurrentUser())

    return dispatch(receiveErrors(data))
}