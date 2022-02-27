import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { AiOutlineHome } from 'react-icons/ai'

import { GetDocsForCustoms_ServerResponse } from 'api/typings/get-docs-for-customs'
import { Spinner } from 'kit/spinner'
import { Error } from 'kit/error'
import { CustomsDocs } from 'modules/customs-docs'
import { Callout } from 'kit/callout'
import { routesList } from 'routes/routes-list'
import { FancyLink } from 'kit/fancy-link'

import { useQuery } from 'react-query'

import { queryName } from 'api/query-name'
import { useClient } from 'context/auth-context'

export function CustomsDocsScreen() {
    const { trackingNumber } = useParams()
    const client = useClient()
    const query = useQuery<HttpSuccessResponse<GetDocsForCustoms_ServerResponse>, HttpErrorResponse>(
        [client.getDocsForCustoms.toString(), trackingNumber],
        () => client.getDocsForCustoms(trackingNumber!)
    )

    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            {query.status === 'success' && (
                <CustomsDocs
                    initialModel={query.data.data}
                    trackingNumber={trackingNumber!}
                />
            )}

            {query.status === 'loading' && (
                <div style={{ marginTop: 48 }}>
                    <Spinner
                        fill
                        delay={0.5}
                    />
                </div>
            )}

            {query.status === 'error' && query.error.response?.status === 422 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Callout style={{ width: 250, marginTop: 24 }} intent='warning' size='small'>
                        {query.error.response?.data.title}
                    </Callout>
                </div>
            )}

            {query.status === 'error' && query.error.response?.status !== 422 && (
                <Error fill style={{ marginTop: 24 }}>
                    {query.error.response?.data.title ? query.error.response.data.title : <FormattedMessage id='app.networkError' />}
                </Error>
            )}

            {query.status === 'error' && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 24
                }}>
                    <FancyLink
                        to={routesList.orders}
                    >
                        <AiOutlineHome size={16} style={{ marginRight: 4 }} />
                        <FormattedMessage id='app.goHomePage' />
                    </FancyLink>
                </div>
            )}
        </ErrorBoundary>
    )
}