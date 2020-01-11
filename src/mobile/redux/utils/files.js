import { appUrl } from './index'

export const getFiles = ({ accessToken, userId }) => (
    fetch(`${appUrl}/app/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    })
)

export const addFile = ({ accessToken, userId }, formData) => (
    fetch(`${appUrl}/app/user/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        },
        body: formData
    })
)