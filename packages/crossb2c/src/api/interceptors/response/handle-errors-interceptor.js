class HttpResponseError extends Error {
    constructor(response, ...args) {
        super(...args)
        Error.captureStackTrace(this, HttpResponseError)
        this.response = response
    }
}

async function handleErrorsInterceptor(response, updateToken, instance) {
    if (response?.status === 401) {
        let updateTokenResponse = await updateToken(false)

        if (updateTokenResponse === null) {
            return Promise.reject(new HttpResponseError(response)) 
        }

        response.config.headers.Authorization = `Bearer ${updateTokenResponse.accessToken}`
        return instance.request(response.config)
    }

    if (response?.status === 403) {
        return Promise.reject(new HttpResponseError(response)) 
    }

    if (response?.status !== 200) {
        return Promise.reject(new HttpResponseError(response)) 
    }

    return response
}


export {
    handleErrorsInterceptor,
    HttpResponseError
}
