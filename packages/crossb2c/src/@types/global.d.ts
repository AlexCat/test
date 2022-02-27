import { AxiosError, AxiosResponse } from 'axios'

type ServerErrorDescription<T> = {
  reason?: string
  title: string
  errors: Array<{
    message?: Array<string>,
    fieldName?: T
  }>
}

declare global {
  type Intent = 'none' | 'primary' | 'success' | 'warning' | 'danger'

  type DocumentNumberType = 'trackNumber' | 'INN'

  interface Window {
    _env_: {
      REACT_APP_API_URL: string
      REACT_APP_AUTH_URL: string,
      REACT_APP_GOOGLE_TAG_MANAGER_CODE: string,
      getEndpoint(alias: 'api' | 'auth'),
      isEndpointChanged(): boolean,
    }
  }

  export type HttpErrorResponse<T = string> = AxiosError<ServerErrorDescription<T>>
  
  export type HttpSuccessResponse<T> = AxiosResponse<T>
}

export { }