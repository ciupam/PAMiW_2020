import { appUrl } from './index'

export const addUserPost = (post, accessToken) => (
    fetch(`${appUrl}/app/post`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
)

export const getUserPosts = ({ userId, accessToken }) => (
    fetch(`${appUrl}/app/post/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    })
)

export const getPublicPosts = () => (
    fetch(`${appUrl}/app/post`, {
        headers: {
            'Accept': 'application/json'
        }
    })
)

export const deleteUserPost = (postId, accessToken) => (
    fetch(`${appUrl}/app/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
)