import axios from 'axios'

import { handleErrorsInterceptor } from './interceptors/response/handle-errors-interceptor'

const client = ({
    baseUrl,
    token,
    updateToken
}) => {
    const instance = axios.create({
        baseURL: baseUrl,
        validateStatus: status => true,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    // RESPONSE INTERCEPTORS
    instance.interceptors.response.use(
        response => handleErrorsInterceptor(response, updateToken, instance)
    )

    return instance
}

export default client
