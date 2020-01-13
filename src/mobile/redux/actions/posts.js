import * as apiUtils from '../utils/posts'
import { receiveErrors } from './errors'
import { setButtonLoading } from './buttonLoading'

export const GET_USER_POSTS = 'GET_USER_POSTS'
export const GET_PUBLIC_POSTS = 'GET_PUBLIC_POSTS'
export const ADD_USER_POST = 'ADD_USER_POST'
export const DELETE_USER_POST = 'DELETE_USER_POST'

const _getUserPosts = posts => ({
    type: GET_USER_POSTS,
    postData: posts
})

const _getPublicPosts = posts => ({
    type: GET_PUBLIC_POSTS,
    posts
})

const _addUserPost = post => ({
    type: ADD_USER_POST,
    postData: post
})

const _deleteUserPost = postId => ({
    type: DELETE_USER_POST,
    postData: postId
})

export const addUserPost = (post, accessToken) => async dispatch => {
    dispatch(setButtonLoading(true))

    const response = await apiUtils.addUserPost(post, accessToken)
    const data = await response.json()

    dispatch(setButtonLoading(false))

    if (response.ok) return dispatch(_addUserPost(data))

    return dispatch(receiveErrors(data))
}

export const getUserPosts = session => async dispatch => {
    const response = await apiUtils.getUserPosts(session)
    const data = await response.json()

    if (response.ok) return dispatch(_getUserPosts(data))
}

export const getPublicPosts = () => async dispatch => {
    const response = await apiUtils.getPublicPosts()
    const data = await response.json()

    if (response.ok) return dispatch(_getPublicPosts(data))
}

export const deleteUserPost = (postId, accessToken) => async dispatch => {
    const response = await apiUtils.deleteUserPost(postId, accessToken)
    if (response.ok) return dispatch(_deleteUserPost(postId))
}