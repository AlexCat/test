import { QueryClient, QueryCache } from 'react-query'


function commonErrorHandler(e) {
    
}

const defaultOptions = {
    queries: {
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        retry(failureCount, error) {
            if (error?.response?.status === 404 || error?.response?.status === 422) return false
            else if (failureCount < 2) return true
            else return false
        },
        onSuccess: e => {

        },
        onError: commonErrorHandler
    },
    mutations: {
        onError: commonErrorHandler
    }
}

const queryCache = new QueryCache()
const queryClient = new QueryClient({
    queryCache,
    defaultOptions,
})

export {
    queryClient
}