function refreshToken() {
    return _client('api/v1/auth/refresh-token', null, null, 'POST')
}

function login({ code, redirectUri, state }) {
    return _client('api/v1/auth/auth', null, { code, redirectUri, state }, 'POST')
}

function loginByCode({ authCode }) {
    return _client('api/v1/auth/auth-by-code', null, { authCode }, 'POST')
}

function savePersonal({ code, redirectUri, state }) {
    return _client('api/v1/auth/save-personal', null, { code, redirectUri, state }, 'POST')
}

function preAuth() {
    return _client('api/v1/auth/pre-auth', null, null, 'POST')
}

async function logout() {
    try {
        const response = await refreshToken()
        return _client('api/v1/auth/logout', response.accessToken, null, 'POST')
    } catch (e) {
        return Promise.resolve({ status: 200 })
    }
}

function register({ username, password }) {
    return _client('register', { username, password })
}

async function _client(endpoint, token, data, method) {
    const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    if (data) {
        config.body = JSON.stringify(data)
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return window.fetch(`${window._env_.getEndpoint('auth')}/${endpoint}`, config).then(async response => {
        if (response.ok) {
            try {
                return await response.json()
            } catch (e) {
                return response
            }
        } else {
            return Promise.reject(response)
        }
    })
}


export {
    refreshToken,

    loginByCode,
    login,
    savePersonal,
    register,
    logout,
    preAuth
}
