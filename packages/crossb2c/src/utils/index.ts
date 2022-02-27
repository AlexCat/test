import React from 'react'
import { uniqBy } from 'lodash-es'
import { UseFormTrigger } from 'react-hook-form'

function notConcurrent<T>(proc: () => PromiseLike<T>) {
    let inFlight: Promise<T> | false = false

    return () => {
        if (!inFlight) {
            inFlight = (async () => {
                try {
                    return await proc()
                } finally {
                    inFlight = false
                }
            })()
        }
        return inFlight
    }
}

type CommonError = {
    title: string
    errors: { message: string }[]
}

function buildServerError(queryError: unknown): CommonError {
    try {
        const smoothError = (queryError as any)

        let title: string = smoothError.response?.data?.title ?? ''
        let errors: { message: string }[] = smoothError.response?.data?.errors ?? []

        if (!title) {
            title = smoothError.response.status
        }

        return { title, errors }
    }
    catch (e) {
        return { title: 'Ошибка', errors: [{ message: 'Неизвестная ошибка' }] }
    }
}

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here")
}

function patchWindowEnv() {
    window._env_.getEndpoint = (alias) => {
        const baseUrl = localStorage.getItem('baseUrl')
        if (baseUrl) {
            return baseUrl
        }

        switch (alias) {
            case 'api': return window._env_.REACT_APP_API_URL
            case 'auth': return window._env_.REACT_APP_AUTH_URL
            default: new Error('have not uri')
        }
    }

    window._env_.isEndpointChanged = () => {
        return !!localStorage.getItem('baseUrl')
    }
}

const toBase64 = (file: File) => new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

const getFileId = (file: File) => file.name + file.size

const mergeFilesForDropzone = (prev: File[], next: File[]) => {
    return uniqBy([...prev, ...next], file => getFileId(file))
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Байт'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function formSwitchIntent(errorMessage?: string, dirty?: boolean): Intent {
    return errorMessage ? 'danger' : 'success'
}

function TriggerFormInitially<T>({ trigger }: { trigger: UseFormTrigger<T> }) {

    React.useEffect(() => {
        trigger()
    }, [trigger])

    return null
}

function truncateString(value: string, cutAfterLength: number = 30) {
    const dots = '...'
    return value.slice(0, cutAfterLength - dots.length) + (value.length > cutAfterLength ? dots : '')
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

export {
    formSwitchIntent,
    notConcurrent,
    buildServerError,
    isLocalhost,
    assertUnreachable,
    patchWindowEnv,
    toBase64,
    getFileId,
    mergeFilesForDropzone,
    formatBytes,
    TriggerFormInitially,
    truncateString,
    capitalizeFirstLetter
}