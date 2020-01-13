import { appUrl, apiUrl } from './index'

export const isTokenExpired = async accessToken => {
    try {
        const response = await fetch(`${appUrl}/app/token`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        })
        return false
    } catch (err) {
        return true
    }
}

export const login = user => (
    fetch(`${apiUrl}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
)

export const logout = () => (
    fetch(`${apiUrl}/api/user/logout`, { method: 'DELETE' })
)

export const getToken = token = () => (
    fetch(`${apiUrl}/api/user/token`, {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
)